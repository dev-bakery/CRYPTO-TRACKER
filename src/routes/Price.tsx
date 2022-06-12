import {useQuery} from 'react-query';
import { fetchCoinTickers } from '../api';
import styled from 'styled-components';
interface PriceProps {
    coinId : string
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
}
const PriceList = styled.ul`

`;
const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding:20px;
    border-radius: 10px;
    margin-bottom: 10px;
`;
const TextTitle = styled.span`
    color:#000;
`;
const TextPrice = styled.span`
    color:#000;
`;
function Price({coinId}:PriceProps){

    const {isLoading, data} = useQuery<PriceData>(['price', coinId], ()=> fetchCoinTickers(coinId))
    return <>
        {
            isLoading ? 'Loading Price...' : <PriceList>
            <ListItem>
                <TextTitle>price</TextTitle>
                <TextPrice>{data?.quotes.USD.price.toFixed(3)}</TextPrice>
            </ListItem>
            <ListItem>
                <TextTitle>percent_change_6h</TextTitle>
                <TextPrice>{data?.quotes.USD.percent_change_6h}</TextPrice>
            </ListItem>
            <ListItem>
            <TextTitle>percent_change_12h</TextTitle>
                <TextPrice>{data?.quotes.USD.percent_change_12h}</TextPrice>
            </ListItem>
            <ListItem>
                <TextTitle>percent_change_24h</TextTitle>
                <TextPrice>{data?.quotes.USD.percent_change_24h}</TextPrice>
            </ListItem>
        </PriceList>
        }
    </>
}
export default Price;