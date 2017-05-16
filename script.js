

/*
    Łukasz Tyszkiewicz - informatyka 

    Algorytm tworzący zbiór Mandelbrota - Javascript ES6
    
    funkcja checkIfMandelbrotSet kalkuluje dla każdego Z_{n} = C*C + C przy czym C to liczba zespolona C = x+iy
     według warunku że każde kolejne Z będzie równe kwadratowi poprzedniego Z zsumowanego z tą samą liczbą zespoloną C.
     kroki te iterujemy w nieskończoność (w przypadku mojej interpretacji algorytmu jest to 1000 kroków)
     W celu uzyskania widocznego obrazu musiałem od współrzędnej x oraz y odjąć odpowiednie wartości zoomValue oraz panX i panY

     Reszta funkcji odpowiada tylko i wyłącznie za rysowanie kanwy HTML5 oraz operacje na kontekście kanwy

     Odpowiednie linijki kodu opatrzone są komentarzami w celu lepszego przekazania treści merytorycznej kodu źródłowego algorytmu



*/





(function() {

    //tworzenie kanwy

    const mandelbrotCanvas = document.createElement('canvas');
    const body = document.querySelector('body');
    mandelbrotCanvas.width = 600;
    mandelbrotCanvas.height = 600;
    body.appendChild(mandelbrotCanvas);
    const ctx = mandelbrotCanvas.getContext('2d');
    
    //warunek sprawdzający czy wygenerowana liczba należy do zbioru mandelbrota

    function checkIfMandelbrotSet(x, y) {
        // C = x + iy
        let mainRealComponent = x;
        let mainImaginaryComponent = y; 
        let iterations = 1000; //liczba iteracji

        for(let i = 0; i < iterations; i++) {
            //Obliczanie realnych i wyimaginowanych składników liczby Z

            //Zastosowanie tymczasowych zmiennych w celu przypisania wartośći
            // Z_{n} = Z_{n-1}^2 + C
            let tempRealComponent = mainRealComponent * mainRealComponent
                                    - mainImaginaryComponent * mainImaginaryComponent
                                    + x;
            //Zastosowanie tymczasowych zmiennych w celu przypisania wartośći                      
            let tempImaginaryComponent = 2 * mainRealComponent * mainImaginaryComponent
                                    + y;

            //przypisanie wartości tymczasowej

            mainRealComponent = tempRealComponent;

            //przypisanie wartości tymczasowej

            mainImaginaryComponent = tempImaginaryComponent;
            
            //Warunek zwracający wartość procentową kolorów według CSS3 HSL
            
            if (mainRealComponent *mainRealComponent + mainImaginaryComponent *mainImaginaryComponent > 5)
                return (i/iterations * 100); 
        }

        return true; 
}


    //W celu uzyskania całego zbioru mandelbrota należy usunąć linijke 76 oraz 81 oraz w linijce 82 wpisać '/*'  a w 86 '*/' Znaki te symoblizują komentarz ogólny  

    /* 
    
    let zoomValue = 200;                                  
     let panX = 1.8,                  
         panY = 1.6;
    */

    let zoomValue = 3000; // Zoom
    let panX = 0.64,
        panY = 0.69

 for(let x=0; x < mandelbrotCanvas.width; x++) {
        for(let y=0; y < mandelbrotCanvas.height; y++) {
            let belongsToSet = 
                    checkIfMandelbrotSet(x/zoomValue - panX, y/zoomValue - panY); // Sprawdzanie według odpowiednich przybliżen i przesunięć kanwy
            if(belongsToSet === true) {
                    ctx.fillStyle = '#000000'; // czarny kolor 
                    ctx.fillRect(x,y, 1,1); // Rysowanie czarnego pixela
            }
            else{
                ctx.fillStyle = `hsl(200, 100%, ${belongsToSet}%)`; // Hue, Saturation, Lightness
                ctx.fillRect(x,y, 1,1); // Rysowanie kolorowego pixela
            }                
        } 
    }


})();