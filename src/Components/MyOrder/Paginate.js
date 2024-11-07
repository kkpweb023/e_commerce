import React from 'react';
import './Paginate.css';

const Paginate = ({ setPage, page }) => {




    return (
        <div className='paginate_div d-flex justify-content-center'>

            <nav aria-label="Page navigation example">
                <ul className="pagination">

                    <li className="page-item" >
                        {
                            page === 1
                                ? ""
                                : <button type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => setPage(page - 1)}
                                >Previous</button>

                        }
                    </li>

                    <li className="page-item" onClick={() => setPage(1)}>
                        <button type="button" className="btn btn-outline-primary btn-sm">1</button>
                    </li>

                    <li className="page-item" onClick={() => setPage(2)}>
                        <button type="button" className="btn btn-outline-primary btn-sm">2</button>
                    </li>

                    <li className="page-item" onClick={() => setPage(3)}>
                        <button type="button" className="btn btn-outline-primary btn-sm">3</button>
                    </li>

                    <li className="page-item" onClick={() => setPage(4)}>
                        <button type="button" className="btn btn-outline-primary btn-sm">4</button>
                    </li>


                    <li className="page-item">
                        {
                            page > 1
                                ? ""
                                : <button type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => setPage(page + 1)}
                                >Next</button>
                        }
                    </li>

                </ul>
            </nav>

        </div>
    )
}

export default Paginate;