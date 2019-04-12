import React from 'react';
import { Mutation } from 'react-apollo';

import REPOSITORY_FRAGMENT from '../fragments';
import Link from '../../Link';
import Button from '../../Button';

import '../style.css';

const RepositoryItem = ({}) => (
    <div>
        <div className="RepositoryItem-title">
            <h2>
                <Link href={url}>{name}</Link>
            </h2>
        </div>
        <div className="RepositoryItem-description">
                <div className="RepositoryItem-description-details">

                </div>
        </div>
    </div>
);

export default RepositoryItem;