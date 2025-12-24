"""Flask mock server for testing scrapers without hitting real websites"""
from flask import Flask, render_template_string, jsonify
from flask_cors import CORS


def create_app():
    """Create and configure Flask app"""
    app = Flask(__name__)
    CORS(app)
    
    @app.route('/')
    def index():
        """Mock homepage"""
        return jsonify({"status": "Mock server running", "version": "1.0.0"})
    
    @app.route('/search')
    def search():
        """Mock search results page"""
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mock TÜBİTAK Search</title>
        </head>
        <body>
            <div class="search-results">
                <div class="article-item">
                    <h3 class="article-title">Yapay Zeka Tabanlı Sağlık Sistemleri</h3>
                    <div class="authors">
                        <span class="author">Dr. Ahmet Yılmaz</span>
                        <span class="author">Prof. Dr. Ayşe Demir</span>
                    </div>
                    <div class="abstract">
                        Bu çalışmada yapay zeka teknolojilerinin sağlık sektöründeki 
                        uygulamaları incelenmiştir.
                    </div>
                    <div class="keywords">
                        <span class="keyword">yapay zeka</span>
                        <span class="keyword">sağlık</span>
                        <span class="keyword">makine öğrenmesi</span>
                    </div>
                    <span class="journal-name">Bilgisayar Bilimleri Dergisi</span>
                    <a class="doi-link" href="https://doi.org/10.1234/example.2024.001">DOI</a>
                </div>
                
                <div class="article-item">
                    <h3 class="article-title">Derin Öğrenme ile Görüntü İşleme</h3>
                    <div class="authors">
                        <span class="author">Dr. Mehmet Kaya</span>
                    </div>
                    <div class="abstract">
                        Derin öğrenme algoritmalarının görüntü işlemede kullanımı araştırılmıştır.
                    </div>
                    <div class="keywords">
                        <span class="keyword">derin öğrenme</span>
                        <span class="keyword">görüntü işleme</span>
                    </div>
                    <span class="journal-name">Mühendislik Bilimleri Dergisi</span>
                    <a class="doi-link" href="https://doi.org/10.1234/example.2024.002">DOI</a>
                </div>
                
                <div class="article-item">
                    <h3 class="article-title">Nesnelerin İnterneti ve Güvenlik</h3>
                    <div class="authors">
                        <span class="author">Dr. Fatma Öztürk</span>
                        <span class="author">Dr. Ali Çelik</span>
                    </div>
                    <div class="abstract">
                        IoT cihazlarının güvenlik açıkları ve çözüm önerileri sunulmuştur.
                    </div>
                    <div class="keywords">
                        <span class="keyword">IoT</span>
                        <span class="keyword">güvenlik</span>
                        <span class="keyword">siber güvenlik</span>
                    </div>
                    <span class="journal-name">Siber Güvenlik Dergisi</span>
                    <a class="doi-link" href="https://doi.org/10.1234/example.2024.003">DOI</a>
                </div>
            </div>
        </body>
        </html>
        """
        return render_template_string(html)
    
    @app.route('/article/<int:article_id>')
    def article_detail(article_id):
        """Mock article detail page"""
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mock Article Detail</title>
        </head>
        <body>
            <div class="article-detail">
                <h3 class="article-title">Test Article {article_id}</h3>
                <div class="authors">
                    <span class="author">Test Author</span>
                </div>
                <div class="abstract">This is a test abstract for article {article_id}</div>
                <div class="keywords">
                    <span class="keyword">test</span>
                    <span class="keyword">mock</span>
                </div>
                <span class="journal-name">Test Journal</span>
            </div>
        </body>
        </html>
        """
        return render_template_string(html)
    
    @app.route('/broken-page')
    def broken_page():
        """Mock broken page for testing error handling"""
        html = """
        <!DOCTYPE html>
        <html>
        <body>
            <div class="wrong-structure">
                <!-- Intentionally broken structure for testing -->
                <span>No proper article elements here</span>
            </div>
        </body>
        </html>
        """
        return render_template_string(html)
    
    @app.route('/health')
    def health():
        """Health check endpoint"""
        return jsonify({"status": "healthy"})
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='localhost', port=5000, debug=True)
