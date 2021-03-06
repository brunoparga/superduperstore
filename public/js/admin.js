// TODO: use a React component here to display either the product cards or a
// message saying 'no products, go sell something'

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "deleteProduct" }] */
const deleteProduct = (btn) => {
  const _id = btn.parentNode.querySelector('[name=_id]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  const productElement = btn.closest('article');

  fetch(`/admin/product/${_id}`, {
    method: 'DELETE',
    headers: { 'csrf-token': csrf },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'Success!') {
        productElement.parentNode.removeChild(productElement);
      }
    });
};
