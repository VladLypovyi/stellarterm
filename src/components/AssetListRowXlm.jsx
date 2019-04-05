import React from 'react';
import PropTypes from 'prop-types';
import AssetCard2 from './AssetCard2';
import Printify from '../lib/Printify';
import Format from '../lib/Format';
import Ticker from '../lib/api/Ticker';

export default function AssetListRows(props) {
    const { ticker } = props;
    const Xlm = ticker.data.assets.find(asset => asset.id === 'XLM-native');

    const priceUSD = (
        <span>${Printify.lightenZeros(Xlm.price_USD.toString(), Format.niceNumDecimals(Xlm.price_USD))}</span>
    );
    const volume24h = `$${Xlm.volume24h_USD.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;

    const change24h = ticker.data._meta.externalPrices.USD_XLM_change;
    const changeIsPositive = ticker.data._meta.externalPrices.USD_XLM_change > 0;
    const change24hPercent = (
        <span className={`AssetList__asset__change${changeIsPositive ? 'Positive' : 'Negative'}`}>
            {change24h.toFixed(2)}%
        </span>
    );

    const assetListClass = 'AssetList__asset__amount';
    return (
        <a href={`#exchange/${Xlm.topTradePairSlug}`} key={`asset-${Xlm.id}`} className="AssetList__asset">
            <div className="AssetList__asset__assetCard">
                <AssetCard2 code={Xlm.code} issuer={Xlm.issuer} />
            </div>

            <div className={assetListClass}>
                {Printify.lightenZeros('1.0000000')}
                {Printify.lighten(' XLM')}
            </div>
            <div className={assetListClass}>{priceUSD}</div>
            <div className={assetListClass}>{volume24h}</div>
            <div className={assetListClass}>{change24hPercent}</div>
            <div className={assetListClass} />
        </a>
    );
}

AssetListRows.propTypes = {
    ticker: PropTypes.instanceOf(Ticker).isRequired,
};
