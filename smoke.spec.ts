import { test, expect } from '@playwright/test'

test('counter smoke test', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(err.message))

  await page.goto('http://localhost:5173')
  await expect(page).toHaveTitle('smoke-test')

  const button = page.getByRole('button', { name: /count is 0/i })
  await expect(button).toBeVisible()
  await button.click()
  await expect(page.getByRole('button', { name: /count is 1/i })).toBeVisible()

  await page.screenshot({ path: 'screenshot.png' })
  expect(consoleErrors).toEqual([])
})
