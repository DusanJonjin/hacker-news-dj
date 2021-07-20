import React from 'react';
import { Link } from 'react-router-dom';

export function StoriesPaginate(props) {

    const {
        pageNum, 
        storiesCount=500, 
        handleMidBtns, 
        midBtns,
        storiesPerPage,
        storiesURL
    } = props;

    const firstPage = 1;

    const lastPage = Math.ceil(storiesCount / storiesPerPage);

    const firstMidBtn = midBtns[0];

    const lastMidBtn = midBtns[midBtns.length - 1]

    const midBtnsCount = midBtns.length;

    const initialBtnsArr = Array.from(
        {length: midBtnsCount}, (_ ,i) => i + 2
    );

    const handleFirstPageSelect = () => handleMidBtns(initialBtnsArr);

    const handleLastPageSelect = () => {
        handleMidBtns(
            Array.from(
                {length: midBtnsCount}, (_, i) => i + (lastPage - midBtnsCount)
            )
        );
    };

    const numToChangeMidBtnsArr = 
        midBtnsCount % 2 === 0 ? midBtnsCount / 2
      : (midBtnsCount - 1) / 2
    ;

    const increaseMidBtnsValues = () => {
        if (lastMidBtn === lastPage - 1) return;
        const increasedArrValues = midBtns.map(num => 
            num + numToChangeMidBtnsArr
        );
        handleMidBtns(increasedArrValues);
    };

    const decreaseMidBtnsValues = () => {
        if (firstMidBtn === firstPage + 1) return;
        const decreasedArrValues = midBtns.map(num => 
            num - numToChangeMidBtnsArr
        );
        handleMidBtns(decreasedArrValues);
    };

    const handlePaginateBtnClick = (num, i, arr) => {
        if (num === pageNum) return;
        if (firstMidBtn !== 1) {
            if (i === 0) decreaseMidBtnsValues();
            if (i === arr.length - 1) increaseMidBtnsValues();
        }
    };

    const paginationBtns = midBtns.map((num, i, arr) =>
        <Link 
            to={num === 1 ? storiesURL : `${storiesURL}/page_${num}`}
            key={num}
            className={`pagin-numbers ${num === pageNum ? 'pagin-num-selected' : ''}`}
            onClick={() => handlePaginateBtnClick(num, i, arr)}
        >
            {num}
        </Link>
    );

    const displayThreeDots = {
        onStart: firstMidBtn !== firstPage + 1,
        onEnd: lastMidBtn !== lastPage - 1
    }

    const showFirstLastPageBtn = firstMidBtn > 1

    return (
        <div className={`pagination`}>
            {showFirstLastPageBtn &&
                <React.Fragment>
                    <Link 
                        to={storiesURL}
                        onClick={handleFirstPageSelect}
                        className={`pagin-numbers ${pageNum === firstPage ? 'pagin-num-selected' : ''}`}
                    >
                        {firstPage}
                    </Link>
                    {
                        displayThreeDots.onStart && 
                            <p className='three-dots'>...</p>
                    }
                </React.Fragment>
            }
            <ol className='pagination-ol'>
                {paginationBtns}
            </ol>
            {showFirstLastPageBtn &&
                <React.Fragment>
                    {
                        displayThreeDots.onEnd && 
                            <p className='three-dots'>...</p>
                    }
                    <Link 
                        to={`${storiesURL}/page_${lastPage}`}
                        onClick={handleLastPageSelect}
                        className={`pagin-numbers ${pageNum === lastPage ? 'pagin-num-selected' : ''}`}
                    >
                        {lastPage}
                    </Link>
                </React.Fragment>
            }
        </div>
    )
}
