import '@babel/polyfill';
import axios from 'axios'; // Axios library for fetch api

const adminBtn = document.querySelector('.btn--admin');
const newProductForm = document.querySelector('.new--productCreate__form');
const newUserForm = document.querySelector('.new--userCreate__form');
const updateUserForm = document.querySelector('.update--user__form');
const updateProductForm = document.querySelector('.update--product__form');
const updateProductBtn = document.querySelector(
  '.update--product .btn--update'
);
const updateUserBtn = document.querySelector('.update--user .btn--update');
const deleteProductBtn = document.querySelector(
  '.delete--product .btn--delete'
);
const deleteUserBtn = document.querySelector('.delete--user .btn--delete');
const deleteOrderBtn = document.querySelector('.delete--order .btn--delete');

// Logout Function
const adminLogout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      // Hack for location.reload(true);
      window.setTimeout(() => {
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// NEW PRODUCT FUNCTION
const productCreate = async (
  name,
  keyword,
  brand,
  description,
  price,
  images
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/products',
      data: {
        name,
        keyword,
        brand,
        description,
        price,
        images,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/admin/products');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// UPDATE PRODUCT FUNCTION
const updateProduct = async (
  name,
  keyword,
  brand,
  description,
  price,
  images,
  productId
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/products/${productId}`,
      data: {
        name,
        keyword,
        brand,
        description,
        price,
        images,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/admin/products');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// DELETE PRODUCT FUNCTION
const deleteProduct = async (productId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/products/${productId}`,
    });

    console.log(res);

    if (res.status === 204) {
      window.setTimeout(() => {
        location.assign('/admin/products');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// NEW USER FUNCTION
const userCreate = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/admin/users');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// UPDATE USER FUNCTION
const updateUser = async (name, email, password, userId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${userId}`,
      data: {
        name,
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/admin/users');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// DELETE USER FUNCTION
const deleteUser = async (userId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/users/${userId}`,
    });

    if (res.status === 204) {
      window.setTimeout(() => {
        location.assign('/admin/users');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

// DELETE ORDER FUNCTION
const deleteOrder = async (orderId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/orders/${orderId}`,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/admin/orders');
      }, 500);
    }
  } catch (err) {
    console.log(err.response);
  }
};

//------- Admin Dashboard -------//

// Admin logout
if (adminBtn) {
  adminBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adminLogout(); // Logout function
  });
}

//--------- PRODUCT PANEL ------------//

// 1) NEW PRODUCT
if (newProductForm) {
  newProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.new--product_name').value;
    const keywordData = document.querySelector('.new--product_keyword').value;
    const brand = document.querySelector('.new--product_brand').value;
    const description = document.querySelector(
      '.new--product_description'
    ).value;
    const price = document.querySelector('.new--product_price').value;
    const image = document.querySelector('.new--product_image').value;
    const images = image.split(',');
    const keyword = keywordData.split(',');
    console.log(name, brand, price);
    console.log(keywordData);
    console.log(images);
    console.log(description);
    productCreate(name, keyword, brand, description, price, images);
  });
}

//2) UPDATE PRODUCT
if (updateProductForm) {
  updateProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { productId } = updateProductBtn.dataset;
    const name = document.querySelector('.update--product_name').value;
    const keywordData = document.querySelector(
      '.update--product_keyword'
    ).value;
    const brand = document.querySelector('.update--product_brand').value;
    const description = document.querySelector(
      '.update--product_description'
    ).value;
    const price = document.querySelector('.update--product_price').value;
    const image = document.querySelector('.update--product_image').value;
    const keyword = keywordData.split(',');
    const images = image.split(',');
    console.log(name, brand, price);
    console.log(keywordData);
    console.log(images);
    console.log(description);
    updateProduct(name, keyword, brand, description, price, images, productId);
  });
}

//3) DELETE PRODUCT
if (deleteProductBtn) {
  deleteProductBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { productId } = deleteProductBtn.dataset;
    console.log(productId);
    deleteProduct(productId);
  });
}

//---------- USER PANEL ----------//

// 1) NEW USER
if (newUserForm) {
  newUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.new--user_name').value;
    const password = document.querySelector('.new--user_password').value;
    const passwordConfirm = document.querySelector(
      '.new--user_password-confirm'
    ).value;
    const email = document.querySelector('.new--user_email').value;
    console.log(name, email, password, passwordConfirm);
    userCreate(name, email, password, passwordConfirm);
  });
}

// 2) UPDATE USER
if (updateUserForm) {
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { userId } = updateUserBtn.dataset;
    const name = document.querySelector('.update--user_name').value;
    const password = document.querySelector('.update--user_password').value;
    const email = document.querySelector('.update--user_email').value;
    console.log(name, email, password);
    updateUser(name, email, password, userId);
  });
}

//3) DELETE USER
if (deleteUserBtn) {
  deleteUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { userId } = deleteUserBtn.dataset;
    console.log(userId);
    deleteUser(userId);
  });
}

//---------- ORDER PANEL ------------//

//1) DELETE ORDER
if (deleteOrderBtn) {
  deleteOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { orderId } = deleteOrderBtn.dataset;
    console.log(orderId);
    deleteOrder(orderId);
  });
}
