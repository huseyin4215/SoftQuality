# LearnExp Backend - Quick Setup Script
# Run this after activating virtual environment

Write-Host "🚀 LearnExp Backend Setup Script" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if virtual environment is activated
if ($env:VIRTUAL_ENV) {
    Write-Host "✅ Virtual environment is active: $env:VIRTUAL_ENV`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Virtual environment not detected!" -ForegroundColor Yellow
    Write-Host "Please run: venv\Scripts\activate`n" -ForegroundColor Yellow
    exit 1
}

# Create necessary directories
Write-Host "📁 Creating directories..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "logs" | Out-Null
New-Item -ItemType Directory -Force -Path "reports" | Out-Null
Write-Host "✅ Directories created`n" -ForegroundColor Green

# Copy environment file if not exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .env file already exists`n" -ForegroundColor Blue
}

# Install/upgrade pip
Write-Host "📦 Upgrading pip..." -ForegroundColor Cyan
python -m pip install --upgrade pip --quiet
Write-Host "✅ Pip upgraded`n" -ForegroundColor Green

# Install requirements
Write-Host "📥 Installing dependencies..." -ForegroundColor Cyan
pip install -r requirements.txt --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed`n" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies`n" -ForegroundColor Red
    exit 1
}

# Run quick tests
Write-Host "🧪 Running quick tests..." -ForegroundColor Cyan
pytest -m unit -v --tb=short
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Tests passed!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some tests failed" -ForegroundColor Yellow
}

Write-Host "`n🎉 Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  • Edit .env file if needed" -ForegroundColor White
Write-Host "  • Run: pytest (to run all tests)" -ForegroundColor White
Write-Host "  • Run: python mock_server\app.py (to start mock server)" -ForegroundColor White
Write-Host "`nFor more info, see README.md or TERMINAL_KOMUTLARI.md`n" -ForegroundColor Gray
