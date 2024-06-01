const sunglassesOptions = {
    models: [
        {
            name: "aviator",
            price: 300,
            thumbImg: "thumb-aviator.png",
            cssClass: "frame-aviator",
        },
        {      
            name: "half-frame",
            price: 200,
            thumbImg: "thumb-half-frame.png",
            cssClass: "frame-half",
        },
        {
            name: "round",  
            price: 250,
            thumbImg: "thumb-round.png",
            cssClass: "frame-round",
        },
        {  
            name: "wayfarer",
            price: 250,
            thumbImg: "thumb-wayfarer.png",
            cssClass: "frame-wayfarer",
        }],
    lenses: [
        {
            color: "sepia",
            price: 20,
            cssClass: "color-sepia",
        },
        {
            color: "iridescent",
            cssClass: "color-iridescent",
        }],
    frames: [
        {
            color: "charcoal",
            price: 0,
            cssClass: "color-charcoal",
        },
        {
            color: "tan",
            price: 0,
            cssClass: "color-tan",
        },
        {
            color: "rose",
            price: 0,
            cssClass: "color-rose",
        },
    ],
}

const sunglasses = {
    model: {
        name: "aviator",
        price: 300,
        thumbImg: "./images/thumb-aviator.png",
        cssClass: "frame-aviator",
    },
    lenses: {
        color: "sepia",
        price: 20,
        cssClass: "color-sepia",
    },
    frame: {
        color: "charcoal",
        price: 0,
        cssClass: "color-charcoal",
    }     
}

const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = ''

const setSunglasses = (newSunglasses = sunglasses) => newSunglasses;

const render = (newSunglasses) => {
    const { model, lenses, frame } = newSunglasses;
    const price = `$${model.price + lenses.price + frame.price}`;

    productDetailsEl.innerHTML = `
        <h1>${model.name}</h1>
        <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
        <p>${price}</p>
    `;

    productImage.classList.replace(productImage.classList[1], model.cssClass);
    productFrames.classList.replace(productFrames.classList[1], frame.cssClass);
    productLenses.classList.replace(productLenses.classList[1], lenses.cssClass);
}

const addHighlight = (clickedItem) => {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb")).forEach(thumb => thumb.classList.remove("selected"));
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        const siblings = clickedItem.closest("ul").querySelectorAll("button");
        Array.from(siblings).forEach(swatch => swatch.classList.remove("selected"));
    }
    clickedItem.classList.add("selected");
}

document.body.addEventListener("click", (event) => {
    const clickedItem = event.target;

    if (!sunglassesNew) {
        sunglassesNew = sunglasses;
    }

    if (clickedItem.classList.contains("product-thumb")) {
        const currName = clickedItem.dataset.name;

        const { name, price, thumbImg, cssClass } = sunglassesOptions.models.find(item => item.name === currName);

        sunglassesNew = {
            model: { name, price, thumbImg, cssClass },
            lenses: { ...sunglassesNew.lenses },
            frame: { ...sunglassesNew.frame }
        };

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
    }

    if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color;
        const isLenses = clickedItem.closest("div").classList[0] === "product-lenses";

        const { color, price, cssClass } = isLenses ? 
            sunglassesOptions.lenses.find(item => item.color === currColor) :
            sunglassesOptions.frames.find(item => item.color === currColor);

        sunglassesNew = {
            model: { ...sunglassesNew.model },
            lenses: isLenses ? { color, price, cssClass } : { ...sunglassesNew.lenses },
            frame: isLenses ? { ...sunglassesNew.frame } : { color, price, cssClass }
        };

        addHighlight(clickedItem);
        setSunglasses(sunglassesNew);
        render(sunglassesNew);
    }
});

render(sunglasses);
