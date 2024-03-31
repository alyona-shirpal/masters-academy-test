import { PRODUCTS_API } from '../constants/constants';
import { truncateDescription } from '../utils/truncate.function';

const getProducts = async () => {
  const response = await fetch(PRODUCTS_API);

  if(!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const products =  await response.json();
  console.log(products);

 return products;
}

const renderProduct = (product) => {
  const grid = document.querySelector('.grid');

  const productElement = document.createElement('div');
  productElement.classList.add('product');

  const imageElement = document.createElement('img');
  imageElement.src = product.images[0];
  imageElement.classList.add('product-image');
  imageElement.onerror = function() {
    imageElement.src = 'https://placehold.co/600x600'
  };


  const titleElement = document.createElement('h2');
  titleElement.textContent = product.title;
  titleElement.classList.add('product-title');

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = truncateDescription(product.description, 3);
  descriptionElement.classList.add('product-description');

  const readMoreButton = document.createElement('button');
  readMoreButton.textContent = 'Read More';
  readMoreButton.classList.add('read-more-button');
  readMoreButton.addEventListener('click', () => {
    descriptionElement.textContent = product.description;
    readMoreButton.style.display = 'none';
  });

  const infoElement = document.createElement('div');
  infoElement.classList.add('info');
  infoElement.appendChild(titleElement);
  const descriptionWrapper = document.createElement('div');
  descriptionWrapper.classList.add('description-wrapper');
  descriptionWrapper.appendChild(descriptionElement);
  descriptionWrapper.appendChild(readMoreButton);
  infoElement.appendChild(descriptionWrapper);

  const lastBlockElement = document.createElement('div');
  lastBlockElement.classList.add('last-block');

  const categoryElement = document.createElement('div');
  categoryElement.textContent = product.category.name;
  categoryElement.classList.add('category');
  infoElement.appendChild(categoryElement);

  const priceWrapper = document.createElement('div');
  priceWrapper.classList.add('price-wrapper');
  priceWrapper.innerHTML = `<p>Price</p> <p class="product-price">$${product.price}</p>`;
  lastBlockElement.appendChild(priceWrapper);

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.classList.add('product-button');
  lastBlockElement.appendChild(addToCartButton);

  infoElement.appendChild(lastBlockElement);
  productElement.appendChild(imageElement);
  productElement.appendChild(infoElement);

  grid.appendChild(productElement);
};

const init = async () => {
  try {
    const products = await getProducts();
    if (products.length > 0) {
      products.map((product) => renderProduct(product));
    } else {
      console.log('No products found');
    }
  } catch (error) {
    throw new Error(`Error fetching products:', ${error.message}`);
  }
};


init();
