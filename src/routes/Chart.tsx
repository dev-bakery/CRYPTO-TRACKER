import {useQuery} from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId : string;
}
function Chart({coinId}:ChartProps){
    // refetchInterval 옵션은 10000초 마다 refetch하는 옵션
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),{refetchInterval : 10000})
    return <div>
        {isLoading ? "Loading Chart..." : <ApexChart 
            type='candlestick' 
            series={[
                {
                    data: data?.map(price => {
                        return[
                            Date.parse(price.time_close),
                            price.open,
                            price.high,
                            price.low,
                            price.close,
                        ]
                    }) as []
                }
            ]}
            
            options={{
                theme: {
                    mode : "dark"
                },
                chart: {
                    height: 500,
                    width: 500,
                },
                plotOptions: {
                    candlestick: {
                        wick: {
                            useFillColor: true,
                        },
                        colors: {
                            upward: '#3C90EB',
                            downward: '#DF7D46'
                        }
                    }
                }
            }}
        />}
    </div>
}
export default Chart;