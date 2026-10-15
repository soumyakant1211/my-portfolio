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

  test('scroll-spy highlights the section in view', async ({ page }) => {
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.getElementById('skills').offsetTop - 64));
    await expect(page.locator('nav a[href="#skills"]').first()).toHaveAttribute('aria-current', 'true');
  });

  test('opens in Play Mode and remembers a switch to Recruiter Mode', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveClass(/mode-play/);
    await expect(html).toHaveClass(/dark/);
    await expect(page.getByRole('heading', { name: /system status/i })).toBeVisible();

    await page.getByRole('button', { name: 'Recruiter mode' }).first().click();
    await expect(html).toHaveClass(/mode-recruiter/);
    await expect(page.getByRole('link', { name: 'Experience', exact: true }).first()).toBeVisible();

    await page.reload();
    await expect(html).toHaveClass(/mode-recruiter/);

    await page.getByRole('button', { name: 'Play mode' }).first().click();
    await expect(html).toHaveClass(/mode-play/);
  });

  test('"Skip cutscenes" jumps straight to Recruiter Mode', async ({ page }) => {
    await page.getByRole('button', { name: /skip cutscenes/i }).click();
    await expect(page.locator('html')).toHaveClass(/mode-recruiter/);
  });

  test('a ?view=recruiter link opens the plain view', async ({ page }) => {
    await page.goto('/?view=recruiter');
    await expect(page.locator('html')).toHaveClass(/mode-recruiter/);
    await expect(page.getByText('Open to opportunities')).toBeVisible();
  });

  test('light/dark toggle works in Recruiter Mode, while Play Mode stays dark', async ({ page }) => {
    const html = page.locator('html');
    await expect(page.getByRole('button', { name: /toggle theme/i })).toHaveCount(0);

    await page.getByRole('button', { name: 'Recruiter mode' }).first().click();
    await page.getByRole('button', { name: /toggle theme/i }).first().click();
    await expect(html).not.toHaveClass(/dark/);

    await page.reload();
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Play mode' }).first().click();
    await expect(html).toHaveClass(/dark/);
  });

  test('Konami code unlocks the New Game+ terminal', async ({ page }) => {
    // Wait for React to mount so the key listener is attached
    await expect(page.getByRole('heading', { name: /system status/i })).toBeVisible();
    for (const key of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) {
      await page.keyboard.press(key);
    }
    const terminal = page.getByRole('dialog', { name: /new game\+ terminal/i });
    await expect(terminal).toBeVisible();

    const input = terminal.getByRole('textbox', { name: 'Terminal command' });
    await expect(input).toBeFocused();
    await input.fill('whoami');
    await input.press('Enter');
    await expect(terminal.getByText('Soumyakant Tripathy', { exact: true })).toBeVisible();

    await input.fill('mode recruiter');
    await input.press('Enter');
    await expect(page.locator('html')).toHaveClass(/mode-recruiter/);

    await page.keyboard.press('Escape');
    await expect(terminal).toHaveCount(0);
  });

  test('resume download link is present and correct', async ({ page }) => {
    const resumeLink = page.getByRole('link', { name: /Resume/i }).first();
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute('href', /Soumyakant_Tripathy_SDET_Resume.pdf/);
  });

  test('resume PDF and award photos are served', async ({ page, request }) => {
    const resume = await request.get('/Soumyakant_Tripathy_SDET_Resume.pdf');
    expect(resume.ok()).toBeTruthy();
    expect(resume.headers()['content-type']).toContain('pdf');

    const images = page.locator('#achievements img');
    await images.first().scrollIntoViewIfNeeded();
    await expect(images).toHaveCount(3);
    for (const src of await images.evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src')))) {
      expect((await request.get(src)).ok(), src).toBeTruthy();
    }
  });

  test('renders exactly one footer', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('footer')).toHaveCount(1);
  });

  test('skip link is the first thing keyboard users reach', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });
});

test.describe('Mobile layout', () => {
  test.use({ viewport: { width: 360, height: 740 }, hasTouch: true });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page does not scroll horizontally', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('mobile menu opens, navigates and closes', async ({ page }) => {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Skills' }).click();

    await expect(page).toHaveURL(/#skills/);
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });

  test('footer hint opens the terminal on touch screens', async ({ page }) => {
    await page.getByRole('button', { name: 'Open the secret terminal' }).click();
    await expect(page.getByRole('dialog', { name: /new game\+ terminal/i })).toBeVisible();
    await page.getByRole('button', { name: 'Close terminal' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('chatbot panel fits inside the viewport', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle Chatbot' }).click();
    const box = await page.locator('#chatbot-panel').boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(360);
    expect(box.y).toBeGreaterThanOrEqual(0);
  });
});
