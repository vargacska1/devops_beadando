import { test, expect } from '@playwright/test';

test('Kudos Wall E2E', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('🏆 Kudos Wall')).toBeVisible();

  const time=Date.now();

  await page.getByPlaceholder(/Kinek?/i).fill(`Tesztnek_${time}`);
  await page.getByPlaceholder(/Kitől?/i).fill(`Teszttől_${time}`);
  await page.getByPlaceholder(/Miért/i).fill(`Mert teszt!_${time}`);
  

  await page.getByRole('button', { name: 'Küldés' }).click();

  await expect(page.getByText(`Mert teszt!_${time}`)).toBeVisible();
  await expect(page.getByText(`To: Tesztnek_${time}`)).toBeVisible();
});