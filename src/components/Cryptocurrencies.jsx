import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import  Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
   // const [ cryptos, setCryptos ] = useState([]);
    const [ cryptos, setCryptos ] = useState();
    const [searchTerm, setSearchTerm] = useState(''); //Setting up a search field

    //Setting up what we are searching and how from the list
    useEffect(() => {
        setCryptos(cryptosList?.data?.coins); //Added

        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);

    }, [cryptosList, searchTerm]);

    if(isFetching) return <Loader />

    return (
        <>
            {/* to make sure the search doesnt show up on home page */}
            {!simplified && (
                <div className="search-crypto">
                    <Input 
                    placeholder="Search Crypto Cosmoverse" 
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} /> {/* Display Search field */}
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                { cryptos?.map((currency) => (
                    <Col key={currency.id} xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={ <img className="crypto-image" src={currency.iconUrl} /> }
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Price: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                )) }
            </Row>
        </>
    )
}

export default Cryptocurrencies
