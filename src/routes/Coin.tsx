import { useState } from 'react';
import {useParams, useLocation} from 'react-router';
import styled from 'styled-components';

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
const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`;
interface RouteParams{
    coinId : string;
}
interface RouteState{
    name : string;
}

function Coin(){
    const {coinId} = useParams<RouteParams>();
    const [loading, setLoading] = useState(true);
    const {state} = useLocation<RouteState>();
    return <Container>
    <Header>
        {/* state는 Coins컴포넌트에서 name값을 받아 오기 때문에 직접 url입력할 경우에는 state값이 없다.  */}
        <Title>{state ? state.name : "Loading..."}</Title>
    </Header>
    {loading ? (
        <Loader>Loading...</Loader>
    ) : null}
    </Container>
}
export default Coin;