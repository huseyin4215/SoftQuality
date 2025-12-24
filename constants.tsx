
import React from 'react';

export const BACKEND_TEST_CODE = `
import pytest
from rest_framework import status
from django.urls import reverse
from .models import Product

@pytest.mark.django_db
class TestProductAPI:
    """
    Ürün yönetimi API'leri için fonksiyonel test senaryoları.
    """
    
    def test_get_product_list(self, api_client):
        """Tüm ürünlerin listelenmesini doğrular."""
        url = reverse('product-list')
        response = api_client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)

    def test_create_product_valid_data(self, api_client):
        """Geçerli veri ile ürün oluşturma işlemini test eder."""
        payload = {
            "name": "Test Ürünü",
            "price": 100.50,
            "stock": 10
        }
        url = reverse('product-list')
        response = api_client.post(url, payload, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['name'] == payload['name']
`;

export const FRONTEND_TEST_CODE = `
import { test, expect } from '@playwright/test';

test.describe('Kullanıcı Giriş Paneli UI Testleri', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Başarılı giriş işlemi ve dashboard yönlendirmesi', async ({ page }) => {
    // Page Object Model (POM) kullanımı önerilir
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Sifre123!');
    await page.click('button[type="submit"]');

    // Dashboard başlığının görünürlüğünü doğrula
    await expect(page.locator('h1')).toContainText('Hoş Geldiniz');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Geçersiz şifre ile hata mesajı kontrolü', async ({ page }) => {
    await page.fill('input[name="email"]', 'yanlis@test.com');
    await page.fill('input[name="password"]', 'Hatali123');
    await page.click('button[type="submit"]');

    const errorAlert = page.locator('.alert-error');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Kimlik bilgileri hatalı');
  });
});
`;

export const GITHUB_ACTIONS_YAML = `
name: QA Otomasyon Hattı (CI/CD)

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    services:
      db:
        image: postgres:13
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install Dependencies
        run: pip install -r requirements.txt
      - name: Run Pytest
        run: pytest --junitxml=reports/backend-report.xml

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
      - name: Install Dependencies
        run: npm install
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run UI Tests
        run: npx playwright test
`;
