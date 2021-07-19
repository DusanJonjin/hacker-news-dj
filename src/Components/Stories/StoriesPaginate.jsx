import React from 'react';
import { Link } from 'react-router-dom';

export function StoriesPaginate(props) {

    const {
        pageNum, 
        storiesCount=500, 
        handleMidBtnsArr, 
        midBtnsArr,
        storiesPerPage,
        storiesURL
    } = props;

    const firstPageNum = 1;

    const lastPageNum = Math.ceil(storiesCount / storiesPerPage);

    const firstMidBtnNum = midBtnsArr[0];

    const lastMidBtnNum = midBtnsArr[midBtnsArr.length - 1]

    const midBtnsCount = midBtnsArr.length;

    const initialBtnsArr = Array.from(
        {length: midBtnsCount}, (v ,i) => i + 2
    );

    const handleFirstPageNumSelect = () => handleMidBtnsArr(initialBtnsArr);

    const handleLastPageNumSelect = () => {
        handleMidBtnsArr(
            Array.from(
                {length: midBtnsCount}, (v, i) => i + (lastPageNum - midBtnsCount)
            )
        );
    };

    const numToChangeMidBtnsArr = 
        midBtnsCount % 2 === 0 ? midBtnsCount / 2
      : (midBtnsCount - 1) / 2
    ;

    const increaseMidBtnsArrValues = () => {
        if (lastMidBtnNum === lastPageNum - 1) return;
        const increasedArrValues = midBtnsArr.map(num => 
            num + numToChangeMidBtnsArr
        );
        handleMidBtnsArr(increasedArrValues);
    };

    const decreaseMidBtnsArrValues = () => {
        if (firstMidBtnNum === firstPageNum + 1) return;
        const decreasedArrValues = midBtnsArr.map(num => 
            num - numToChangeMidBtnsArr
        );
        handleMidBtnsArr(decreasedArrValues);
    };

    const handlePaginateBtnClick = (num, i, arr) => {
        if (num === pageNum) return;
        if (firstMidBtnNum !== 1) {
            if (i === 0) decreaseMidBtnsArrValues();
            if (i === arr.length - 1) increaseMidBtnsArrValues();
        }
    };

    const paginationBtns = midBtnsArr.map((num, i, arr) =>
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
        onStart: firstMidBtnNum !== firstPageNum + 1,
        onEnd: lastMidBtnNum !== lastPageNum - 1
    }

    const showFirstLastPageBtn = firstMidBtnNum > 1

    return (
        <div className={`pagination`}>
            {showFirstLastPageBtn &&
                <React.Fragment>
                    <Link 
                        to={storiesURL}
                        onClick={handleFirstPageNumSelect}
                        className={`pagin-numbers ${pageNum === firstPageNum ? 'pagin-num-selected' : ''}`}
                    >
                        {firstPageNum}
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
                        to={`${storiesURL}/page_${lastPageNum}`}
                        onClick={handleLastPageNumSelect}
                        className={`pagin-numbers ${pageNum === lastPageNum ? 'pagin-num-selected' : ''}`}
                    >
                        {lastPageNum}
                    </Link>
                </React.Fragment>
            }
        </div>
    )
}
