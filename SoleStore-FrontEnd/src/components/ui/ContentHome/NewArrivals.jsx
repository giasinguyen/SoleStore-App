import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import "./NewArrivals.css";

const NewArrivals = () => {

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN') + ' vnđ';
    };
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;
    const storedProducts = localStorage.getItem("productsData");
    const productsData = storedProducts ? JSON.parse(storedProducts) : [];
    const filteredProducts = productsData
        .filter((product) => {
            let newProducts = product.isNewArrival === true;
            return newProducts
        })

    const endOffset = itemOffset + itemsPerPage;
    const products = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };
    return (
        <section id="3" className="container-custom my-5 pt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Giày Mới</h1>

            </div>

            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-md-3">

                        <div className="card h-100 shadow-sm product-card position-relative">
                            {product.isNewArrival && (
                                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                                    NEW
                                </span>
                            )}
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="card-img-top"
                            />
                            {product.discount > 0 && (
                                <div className="badge badge-sale absolute top-2 right-2 z-10 px-2 py-1 rounded-md font-medium bg-red-500 text-white">
                                    -{product.discount}%
                                </div>
                            )}
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="text-muted">{product.category}</p>
                                </div>
                                {product.originalPrice && (
                                    <span className="fs-6 text-muted text-decoration-line-through ms-2">
                                        {formatCurrency(product.originalPrice)}
                                    </span>
                                )}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    {/* Định dạng giá theo tiền VND */}
                                    <h5 className=" fs-5 text-success fw-bold">{formatCurrency(product.price)}</h5>

                                    <Button as={Link} to={`/product/${product.id}`}
                                        className="btn btn-dark btn-sm d-flex align-items-center"
                                    >
                                        Xem thêm
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="mt-8 pt-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                />
            </div>
        </section>
    );
};

export default NewArrivals;
