import {ScatterChart, Tooltip, XAxis, YAxis, Scatter, Rectangle} from 'recharts';

const blockShape = (props) => {
    return(
        <Rectangle
            {...props}
            height={25}
            x={props.x + 5}
            y={props.y - 22}
        />
)};

const getHeatgroups = (start_price, data) => {
        
    const groupings = [
        {price: start_price - (0.5) * start_price, color: 'rgb(245, 26, 49)'},
        {price: start_price - (0.25) * start_price, color: 'rgb(223, 85, 62)'},
        {price: start_price - (0.1) * start_price, color: 'rgb(166, 96, 27)'},
        {price: start_price, color: 'rgb(120,120,134)'},
        {price: start_price + 0.1 * start_price, color: 'rgb(165, 180, 108)'},
        {price: start_price + 0.25 * start_price, color: 'rgb(119, 181, 80)'},
        {price: start_price + 0.5 * start_price, color: 'rgb(3, 199, 0)'},
    ]

    var heatgroups = [];
    var remaining = [...data];

    groupings.forEach(({price, color}) => {
        heatgroups.push({
            label: `<= ${price}`,
            color,
            data: remaining.filter(d => d.price <= price)
        });

        remaining = remaining.filter(d => d.price > price);
    });
    if (remaining.length > 0) {
        heatgroups.push({
            label: `> ${groupings.pop().price}`,
            color: 'rgb(0, 255, 0)',
            data: remaining,
        });
    }
    return heatgroups;
};

function Heatmap ( {data, start_price, title} ) {

    return(
        <div id="heatmap">
            <h3>{title}</h3>
            <ScatterChart width={500} height={500}>
                <XAxis dataKey="volatility" domain={[data[0].volatility, data[9].volatility]} type='number' />
                <YAxis dataKey="spot_price" domain={[data[0].spot_price, data[9].spot_price]} type='number' />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={{...data}}/>
                {getHeatgroups(start_price, data).map(group => (
                    <Scatter name={group.label} data={group.data} fill={group.color} shape={blockShape} />
                    ))}
            </ScatterChart>
        </div>
    )
    
}

export default Heatmap;