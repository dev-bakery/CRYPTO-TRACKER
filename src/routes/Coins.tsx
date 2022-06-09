import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useQuery} from 'react-query';
import { fetchCoins } from '../api';

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
const Img = styled.img`
    width:20px;
    vertical-align: bottom;
    margin-right:10px;
`;
const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`;

//api 정보의 타입을 미리 정의함
interface ICoin{
    id :string;
    name : string;
    symbol: string;
    rank: number;
    is_new : boolean;
    is_active : boolean;
    type : string;
}

function Coins(){
    const {isLoading, data} = useQuery<ICoin[]>('allCoins', fetchCoins);
    // const [coins,  setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async()=> {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : ( 
            <CoinList>
                {data?.slice(0, 100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname : `/${coin.id}`,
                            state : {name : coin.name},
                        }}>
                            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id.toLowerCase()}.png` } />
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