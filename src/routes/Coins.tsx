import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Container = styled.div`
    padding:0 20px;
    margin: 0 auto;
    max-width: 480px;
`;
const Header = styled.header`
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center; 
`;
const CoinList = styled.ul``;
const Coin = styled.li`
    background-color: #fff;
    color:${props => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        padding:20px;
    }
`;
const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`;
interface CoinInterface{
    id :string;
    name : string;
    symbol: string;
    rank: number;
    is_new : boolean;
    is_active : boolean;
    type : string;
}

function Coins(){
    const [coins,  setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async()=> {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : ( 
            <CoinList>
                {coins.map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`}>
                        {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinList>
            )}
        </Container>
    )
}
export default Coins;