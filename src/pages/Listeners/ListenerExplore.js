import React from 'react';

import HorizontalList from '../../components/Information/HorizontalList';
import ThreelItem from '../../components/Information/ThreelItem';

import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

const ListenerExplore = () => {
    const breadcrumbs = [
        { label: 'Explore', link: '/' }
    ]

    const renderThreelItems = (count, width) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(<ThreelItem key={i} width={width} />);
        }
        return items;
    };

    return (
        <div className='listener-dashboard-grid'>
            <div>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <input
                className='form-control search-input box-shadow'
                type="text"
                placeholder="Search"
                onChange={() => { }}
            />
            <div>
                <br />
                <HorizontalList title="SONGS">
                    {renderThreelItems(10, 155)}
                </HorizontalList>
                <HorizontalList title="VIDEOCASTS">
                    {renderThreelItems(10, 200)}
                </HorizontalList>
                <HorizontalList title="PODCASTS">
                    {renderThreelItems(10, 155)}
                </HorizontalList>
                <br />
            </div>
        </div>

    )
}

export default ListenerExplore;