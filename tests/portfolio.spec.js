import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Soumyakant/i);
  });

  test('navigation links should work smoothly', async ({ page }) => {
    // Click on Experience link
    const experienceLinkDesktop = page.locator('nav a[href="#experience"]').first();
    await experienceLinkDesktop.click();

    // Verify URL has #experience
    await expect(page).toHaveURL(/.*#experience/);

    // Verify Experience section is visible
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();
  });

  test('should toggle dark/light mode', async ({ page }) => {
    // Portfolio might default to dark or light. 
    // We can check if the html element has 'dark' class.
    const html = page.locator('html');
    const isInitiallyDark = await html.evaluate(node => node.classList.contains('dark'));

    // Click the toggle theme button
    const toggleButton = page.getByRole('button', { name: /toggle theme/i }).first();
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
      
      // Wait for class change
      if (isInitiallyDark) {
        await expect(html).not.toHaveClass(/dark/);
      } else {
        await expect(html).toHaveClass(/dark/);
      }
    }
  });
  
  test('resume download link is present and correct', async ({ page }) => {
     const resumeLink = page.getByRole('link', { name: /Resume/i }).first();
     await expect(resumeLink).toBeVisible();
     await expect(resumeLink).toHaveAttribute('href', /Soumyakant_Tripathy_SDET_Resume.pdf/);
  });
});
