import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QComboBox, QVBoxLayout, QWidget, QHBoxLayout, QLabel, QFrame
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl, Qt
import rasterio
from rasterio.plot import reshape_as_image
from PIL import Image
import os

# =======================
# Archivos TIFF
# =======================
tiff_files = {
    "Falso color (B5,B4,B3)": r"C:\Users\camil\DREAM CITY OPEN SOURCE\GEE_exports\rosario+funes+roldan\falso color\rosario falso color.tif",
    "Color natural (B4,B3,B2)": r"C:\Users\camil\DREAM CITY OPEN SOURCE\GEE_exports\rosario+funes+roldan\color real\rosario color real.tif",
    "NDVI": r"C:\Users\camil\DREAM CITY OPEN SOURCE\GEE_exports\rosario+funes+roldan\ndvi\prueba rosario ndvi.tif",
    "Idoneidad ambiental": r"C:\Users\camil\DREAM CITY OPEN SOURCE\GEE_exports\rosario+funes+roldan\suitability\rosario suitability.tif",
    "Riesgo hídrico": r"C:\Users\camil\DREAM CITY OPEN SOURCE\GEE_exports\rosario+funes+roldan\areas de riesgo hidrico\riesgo hidrico rosario.tif"
}

# =======================
# Leyendas por capa
# =======================
leyendas_colores = {
    "Falso color (B5,B4,B3)": (["Urbanización", "Río Paraná", "Plantaciones", "Suelo descubierto"],
                                ["#00ffff", "#05b98c", "#f6272f", "#a0b07f"]),
    "Color natural (B4,B3,B2)": ([], []),  # Sin leyenda
    "NDVI": (["Río Paraná", "Urbanizaciones", "Bosques", "Plantaciones", "Suelo descubierto"],
             ["#ff00ff", "#ffffff", "#25a400", "#2ea411", "#d1ebcb"]),
    "Idoneidad ambiental": (["Río Paraná", "Urbanización / Baja", "Media", "Alta"],
                            ["#ff00ff", "#ffffff", "#b5e48c", "#2d6a4f"]),
    "Riesgo hídrico": (["Área I: Cauces y cuerpos de agua permanentes", 
                        "Área II: Vías de evacuación y almacenamiento", 
                        "Área III: Áreas con riesgo de inundación"],
                       ["#0000ff", "#64d0eb", "#28cf9b"])
}

# =======================
# Funciones TIFF → PNG
# =======================
def tiff_to_png(tiff_path, out_path):
    with rasterio.open(tiff_path) as src:
        img = src.read()
        img_rgb = reshape_as_image(img)
    if img_rgb.dtype != 'uint8':
        img_rgb = ((img_rgb - img_rgb.min()) / (img_rgb.max() - img_rgb.min()) * 255).astype('uint8')
    Image.fromarray(img_rgb).save(out_path)

def add_tiff_to_map(tiff_path, name):
    temp_file = os.path.abspath(f"{name}.png")
    tiff_to_png(tiff_path, temp_file)
    return temp_file

# =======================
# Leyenda flotante pequeña y legible
# =======================
def create_legend_widget(niveles, colores):
    widget = QWidget()
    layout = QVBoxLayout()
    layout.setAlignment(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignBottom)
    layout.setSpacing(3)

    for lvl, col in zip(niveles, colores):
        hbox = QHBoxLayout()
        hbox.setSpacing(5)
        color_box = QFrame()
        color_box.setStyleSheet(f"background-color: {col}; border: 1px solid black;")
        color_box.setFixedSize(20, 12)
        hbox.addWidget(color_box)
        label = QLabel(lvl)
        label.setStyleSheet("font-size: 9pt; font-weight: bold; color: black;")
        hbox.addWidget(label)
        hbox.addStretch()
        layout.addLayout(hbox)

    widget.setLayout(layout)
    widget.setStyleSheet("""
        background-color: rgba(255, 255, 255, 200);
        border: 1px solid black;
        padding: 4px;
        border-radius: 3px;
    """)
    widget.setFixedWidth(220)
    return widget

# =======================
# Panel PyQt
# =======================
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Visualizador TIFF QGIS")
        self.resize(1200, 900)

        main_layout = QVBoxLayout()
        top_layout = QHBoxLayout()

        # Selector de capa
        self.selector = QComboBox()
        self.selector.addItems(list(tiff_files.keys()))
        self.selector.currentTextChanged.connect(self.update_image)
        top_layout.addWidget(self.selector)
        top_layout.addStretch()

        main_layout.addLayout(top_layout)

        self.webview = QWebEngineView()
        main_layout.addWidget(self.webview)

        # Contenedor para leyenda flotante
        self.legend_container = QVBoxLayout()
        self.legend_container.setAlignment(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignBottom)
        main_layout.addLayout(self.legend_container)

        container = QWidget()
        container.setLayout(main_layout)
        self.setCentralWidget(container)

        # Preprocesar PNGs de todas las capas
        self.png_dict = {}
        for name, path in tiff_files.items():
            self.png_dict[name] = add_tiff_to_map(path, name)

        # Mostrar primera capa
        self.update_image(self.selector.currentText())

    def update_image(self, selection):
        png_path = self.png_dict[selection]
        self.webview.setUrl(QUrl.fromLocalFile(png_path))

        # Limpiar leyenda anterior
        for i in reversed(range(self.legend_container.count())):
            item = self.legend_container.itemAt(i).widget()
            if item:
                item.setParent(None)

        # Crear leyenda si tiene
        niveles, colores = leyendas_colores.get(selection, ([], []))
        if niveles:
            legend_widget = create_legend_widget(niveles, colores)
            self.legend_container.addWidget(legend_widget)

# =======================
# Ejecutar app
# =======================
app = QApplication(sys.argv)
window = MainWindow()
window.show()
sys.exit(app.exec())
