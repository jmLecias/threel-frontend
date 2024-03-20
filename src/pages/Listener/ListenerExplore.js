import React from 'react';

import HorizontalList from '../../components/Information/HorizontalList';
import ThreelItem from '../../components/Information/ThreelItem';
import ThreelArtist from '../../components/Information/ThreelArtist';

import ThreelBreadcrumbs from '../../components/Navigation/ThreelBreadcrumbs';

import { useNavigate } from 'react-router-dom';
import { useItem } from '../../hooks/useItem';
import { useArtist } from '../../hooks/useArtist';

const ListenerExplore = () => {

    const { items } = useItem();
    const { artists } = useArtist();

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

    const renderArtists = () => {
        const artistsArr = [];
        artists.map((artist) => {
            artistsArr.push(
                <ThreelArtist
                    key={artist.id}
                    artist={artist}
                    onClick={() => {}}
                />
            );
        });
        return artistsArr;
    }

    const renderThreelItems = (count, width) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            const item  = {
                id: 1,
                title: "Title",
                description: "No description",
                content: "",
                thumbnail: "",
                created_at: "2024-03-11T11:35:25.000000Z",
                updated_at: "2024-03-11T11:35:25.000000Z",
                upload_type: {
                    id: 1,
                    upload_type: "music"
                },
                user_id: 52,
                user: {
                    id: 52,
                    name: "John Mark",
                    username: "Artist",
                    email: "jmlecias18@gmail.com",
                    email_verified_at: null,
                    created_at: "2024-03-06T01:01:25.000000Z",
                    updated_at: "2024-03-06T01:01:25.000000Z",
                    artist_verified_at: null,
                    user_type: 3,
                    status_type: 1
                },
                album: {
                    id: 52,
                    name: "John Mark",
                    description: "Artist",
                    cover: "",
                    email: "jmlecias18@gmail.com",
                    created_at: "2024-03-06T01:01:25.000000Z",
                    updated_at: "2024-03-06T01:01:25.000000Z",
                }
            };
            items.push(
                <ThreelItem
                    key={i}
                    item={item}
                    width={width}
                    onClick={() => navigate("/play", { state: { item: item } })}
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
                <HorizontalList title="ARTISTS">
                    {renderArtists()}
                </HorizontalList>
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