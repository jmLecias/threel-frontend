import React from 'react';

import HorizontalList from '../../components/Information/HorizontalList';
import ThreelItem from '../../components/Information/ThreelItem';

import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

import { useNavigate } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';

const ListenerExplore = () => {

    const { items } = useItem();

    const navigate = useNavigate();

    const breadcrumbs = [
        { label: 'Explore', link: '/' }
    ]

    const renderItems = () => {
        const itemsArr = [];
        items.map((item) => {
            itemsArr.push(
                <ThreelItem
                    key={item.id}
                    item={item}
                    width={155}
                    onClick={() => navigate("/play", { state: { item: item } })}
                />
            );
        });
        return itemsArr;
    };

    const renderThreelItems = (count, width) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            const item = {
                title: 'Title',
                thumbnail: '',
                user: {
                    username: 'Artist'
                }
            }
            items.push(
                <ThreelItem
                    key={i}
                    item={item}
                    width={width}
                    onClick={() => navigate("/play")}
                />
            );
        }
        return items;
    };

    return (
        <div className='listener-dashboard-grid'>
            <div className='listener-dashboard-head'>
                <ThreelBreadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className='listener-dashboard-search'>
                <input
                    className='form-control search-input box-shadow'
                    type="text"
                    placeholder="Search"
                    onChange={() => { }}
                />
            </div>
            <div className='listener-dashboard-content'>
                <br />
                <HorizontalList title="SONGS">
                    {renderItems()}
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