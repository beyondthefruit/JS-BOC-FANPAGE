const store = [
  {
    id: 1,
    title: 'geogaddi',
    category: 'music',
    price: 25.99,
    img: './imgs/geogaddi.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
  {
    id: 2,
    title: 'the campfire headphase',
    category: 'music',
    price: 9.99,
    img: './imgs/campfire.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
  {
    id: 3,
    title: 'Music has the right to children',
    category: 'music',
    price: 12.99,
    img: './imgs/musicchildren.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
  {
    id: 4,
    title: 'boc shirt white',
    category: 'merchandising',
    price: 12.99,
    img: './imgs/store4.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
  {
    id: 5,
    title: 'box shirt man',
    category: 'merchandising',
    price: 12.99,
    img: './imgs/store3.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
  {
    id: 6,
    title: 'music has the right to children shirt',
    category: 'merchandising',
    price: 12.99,
    img: './imgs/store2.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
  {
    id: 7,
    title: 'boc shirt black',
    category: 'merchandising',
    price: 12.99,
    img: './imgs/store1.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ducimus, cupiditate optio delectus rerum amet corporis. ',
  },
];

const storeContent = document.querySelector('.store-content');
const btns = document.querySelectorAll('.filter-btn');

// our store element are populated dynamicely when page load
window.addEventListener('DOMContentLoaded', function () {
  loadStore(store);
});

// we create a forEach to identify each individual btn
btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    //we check if it's working with :
    // console.log(e.currentTarget);

    //we are looking for the specific dataset.id (from our html)
    console.log(e.currentTarget.dataset.id);
    const category = e.currentTarget.dataset.id; // we assign the data of the element that we click on

    // filter to return only items that we are looking for
    const storeCategory = store.filter(function (storeItem) {
      if (storeItem.category === category) {
        return storeItem;
      }
    });
    //we create the other if statement outside the storeCategory const to return all elements
    if (category === 'all') {
      loadStore(store);
    } else {
      loadStore(storeCategory);
    }
  });
});

function loadStore(storeItem) {
  let displayStore = storeItem.map(function (item) {
    //console.log(item); test as we could see we are mapping in each element
    return `
    <div class="store-item">
    <img class="photoo" alt="Photo album" src="${item.img}" />
          <h4>${item.title}</h4>
          <p class="item-text">
            ${item.desc}
          </p>
          <h4 class="price"><i class="fa-solid fa-bag-shopping fa-flip"></i>$${item.price}</h4>
           </div>`;
  });
  displayStore = displayStore.join(' '); //always have to join the elements
  storeContent.innerHTML = displayStore;
  // we use innerHtml on the body element storeContent to add the content of the map
}

//we are doing the same with the button to add them dynamiquely  ----- see later stage

// scroll toggle setup
const navToggle = document.querySelector('.nav-toggle');
const linksCont = document.querySelector('.links-container');
const links = document.querySelector('.links');

// works but not dynamic
// navToggle.addEventListener('click', function () {
//   linksCont.classList('show-links');
// });

// dynamic set
navToggle.addEventListener('click', function () {
  const linksContHeight = linksCont.getBoundingClientRect().height;
  // provide height
  const linksHeight = links.getBoundingClientRect().height;
  console.log(linksHeight);
  if (linksContHeight === 0) {
    linksCont.style.height = `${linksHeight}px`;
  } else {
    linksCont.style.height = 0;
  }
});

const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

// fixed navbar
window.addEventListener('scroll', function () {
  //pageYoffset provide the position Y
  // console.log(window.pageYOffset);
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
});

//smoth scroll for now with a fix navbar we miss the target
const scrolLinks = document.querySelectorAll('.scroll-link');

scrolLinks.forEach(function (link) {
  link.addEventListener('click', (e) => {
    //prevent default
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1); // with slice we are removing the #
    //console.log(id);
    const element = document.getElementById(id);

    //calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksCont.getBoundingClientRect().height;
    const fixNav = navbar.classList.contains('fixed-nav');

    let position = element.offsetTop - navHeight; // get top position of the element (minus the navbar height

    if (!fixNav) {
      //means if navbar isn't in static position
      position = position - navHeight;
      // means that if nav bar isn't here we have to - its size
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksCont.style.height = 0; // it's going to close our nav
  });
});
