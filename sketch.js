var  minSlider,
     maxSlider, //zmienne pozwalająca na zoomowania
     maxIterations = 30; //ilość iteracji

//Renderowanie zawartości ciała
function setup() {
  createCanvas(300, 300);
  pixelDensity(1);

  minSlider = createSlider(-2, 0, -2, 0.01); //Slider do zoomowania 
  maxSlider = createSlider(0, 2, 2, 0.01);

}

//Rysowanie kanwy
function draw(){
  loadPixels();
  //Tworzenie pikseli kanwy
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      //map() to funkcja tworząca tablice jednowymiarową składającą się danych zakresów 
      var a = map(x, 0, width, minSlider.value(), maxSlider.value());
      var b = map(y, 0, height, minSlider.value(), maxSlider.value());
      //
      var tempRealComp = a;
      var tempImComp = b;

      var n = 0;
      //Obliczenia komponentów rzeczywistych i urojonych
      while (n < maxIterations) {
        var realComp = a * a - b * b;
        var imComp = 2 * a * b;
        a = realComp + tempRealComp;
        b = imComp + tempImComp;
        if (a *a + b * b > 16) {
          break;
        }
        //inkrementacja zmiennej iteracyjnej
        n++;
      }
      var brightVal = map(n, 0, maxIterations, 0, 255);
      if (n === maxIterations) {
        brightVal = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = brightVal;
      pixels[pix + 1] = brightVal;
      pixels[pix + 2] = brightVal;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
} 
