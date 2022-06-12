import {useParams, useLocation, useRouteMatch,useHistory} from 'react-router';
import {Switch, Route, Link} from 'react-router-dom';
import styled from 'styled-components';
import {useQuery} from 'react-query';
import {Helmet} from 'react-helmet';
import Chart from './Chart';
import Price from './Price';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

const Container = styled.div`
    padding:0 20px;
    margin: 0 auto;
    max-width: 480px;
`;
const Header = styled.header`
    position:relative;
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center; 
`;
const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`;
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding:10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color:#000;
    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    padding:0 10px;
    margin: 20px 0;
`;
const TabContent= styled.div`
    display: flex;
    margin:10px 0;
    background-color: #fff;
    border-radius: 10px;
    text-transform: uppercase;
    align-items: center;
    a{
        padding:10px 20px;
        
        text-align: center;
        &:hover{
            background-color: rgba(0,0,0,0.2);
        }
    }
`;
const Tab = styled.span<{isActive : boolean}>`
    color:${props => props.isActive ? props.theme.accentColor : "#000"};
    display: block;
    flex: 1;
`;
const ButtonBack = styled.button`
    position:absolute;
    left:0;
    top:50%;
    height:30px;
    transform: translateY(-50%);
    border:0;
    border-radius: 5px;
    padding:0 10px;
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
`;
const ButtonTheme = styled.button`
    position:absolute;
    right:0;
    top:50%;
    height:30px;
    transform: translateY(-50%);
    border:0;
    border-radius: 5px;
    padding:0 10px;
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
`;
interface RouteParams{
    coinId : string;
}
interface RouteState{
    name : string;
}
interface InfoData {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    whitepaper:object;
    first_data_at:string;
    last_data_at:string;
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

function Coin(){
    const [isDark, setIsDark] = useRecoilState(isDarkAtom);
    const theme = isDark ? "light" : "dark";
    let history = useHistory();
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>("['Info', coinId]", ()=> fetchCoinInfo(coinId))
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>("['tickers', coinId]", ()=> fetchCoinTickers(coinId))
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    // useEffect(() => {
    //     (async()=> {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //             ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false)
    //     })();
    // }, [coinId]);
    const loading = infoLoading || tickersLoading;
    return <Container>
        <Helmet>
            <title>
                {state?.name ? state.name : loading ? "Loading" : infoData?.name}
            </title>
        </Helmet>
    <Header>
        {/* state는 Coins컴포넌트에서 name값을 받아 오기 때문에 직접 url입력할 경우에는 state값이 없다.  */}
        <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>
        <ButtonBack onClick={()=>{history.goBack()}}>Back</ButtonBack>
        <ButtonTheme onClick={() => {setIsDark(isDark ? false : true)}}>{theme}</ButtonTheme>
    </Header>
    {loading ? (
        <Loader>Loading...</Loader>
    ) : (
        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total suply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>MAX suply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>
            <TabContent>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
            </TabContent>
            <Switch>
                <Route path={`/:coinId/chart`}>
                    <Chart coinId={coinId}/>
                </Route>
                <Route path={`/:coinId/price`}>
                    <Price coinId={coinId}/>
                </Route>
            </Switch>
        </>
    )}
    </Container>
}
export default Coin;