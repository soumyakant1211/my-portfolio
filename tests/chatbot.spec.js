import { test, expect } from '@playwright/test';

test.describe('Chatbot E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open and close chatbot widget', async ({ page }) => {
    const chatToggle = page.locator('button[aria-label="Toggle Chatbot"]');
    
    // Open
    await chatToggle.click();
    await expect(page.getByRole('heading', { name: 'AI Portfolio Assistant' })).toBeVisible();
    
    // Close
    await chatToggle.click();
    await expect(page.getByRole('heading', { name: 'AI Portfolio Assistant' })).not.toBeVisible();
  });

  test('should render predefined prompts and initial message', async ({ page }) => {
    const chatToggle = page.locator('button[aria-label="Toggle Chatbot"]');
    await chatToggle.click();

    // Check opening message content
    await expect(page.getByText(/You can ask about:/i)).toBeVisible();
    await expect(page.getByText(/Playwright & Selenium/i)).toBeVisible();
    
    // Check chips
    await expect(page.getByRole('button', { name: /Tell me about his experience/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /What automation frameworks has he built\?/i })).toBeVisible();
  });

  test('should answer specific recruiter questions correctly', async ({ page }) => {
    const chatToggle = page.locator('button[aria-label="Toggle Chatbot"]');
    await chatToggle.click();

    // Click experience prompt
    await page.getByRole('button', { name: /Tell me about his experience/i }).click();

    // Wait for the bot to type and respond
    // It takes 600ms minimum based on setTimeout in the code
    await expect(page.getByText(/reducing regression execution time by 40%/i)).toBeVisible({ timeout: 5000 });
  });

  test('should execute navigation commands', async ({ page }) => {
    const chatToggle = page.locator('button[aria-label="Toggle Chatbot"]');
    await chatToggle.click();

    // Type navigation command
    const input = page.getByPlaceholder(/Ask about my automation experience/i);
    await input.fill('show experience');
    await input.press('Enter');

    await expect(page.getByText(/Navigating to the Experience section/i)).toBeVisible({ timeout: 5000 });
    
    // The navigation updates the hash to #experience
    // Playwright handles hash navigation correctly, we just check URL
    await page.waitForURL(/.*#experience/, { timeout: 2000 });
  });

  test('should execute external link actions', async ({ page, context }) => {
    const chatToggle = page.locator('button[aria-label="Toggle Chatbot"]');
    await chatToggle.click();

    // Wait for new page (tab) to open on GitHub click
    const pagePromise = context.waitForEvent('page');
    
    await page.getByRole('button', { name: /View GitHub/i }).click();
    const newPage = await pagePromise;

    // Check if new tab went to correct URL
    await expect(newPage).toHaveURL(/.*github\.com\/soumyakant1211/);
  });
});
