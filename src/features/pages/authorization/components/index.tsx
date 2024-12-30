import React from 'react';
import './scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { IRoles } from '../types/auth.type';
import CardsDeepdive from './cards-deepdive';
import RolesCard from './rolesCards';

const AUTHORIZATION_CONFIG = {
    TITLE: 'Comprehensive Role-Based Access Control (RBAC) Management',
    DESCRIPTION: "Centralized authorization framework designed to provide granular control over system access and permissions. This module enables administrators to define, manage, and enforce role-specific access privileges across the application's menu structures and functional components, ensuring robust security and precise user entitlement management."
} as const;

const Authorization: React.FC = React.memo(() => {
    const [cardClicked, setCardClicked] = React.useState<IRoles | null>(null);
    return (
        <div className='authorization'>
            <div className='auth-header'>
                <div className='title'>{AUTHORIZATION_CONFIG.TITLE}</div>
                <div className='auth-description'>{AUTHORIZATION_CONFIG.DESCRIPTION}</div>
            </div>
            <RolesCard
                cardClicked={cardClicked}
                setCardClicked={setCardClicked}
            />
            {!cardClicked && (
                <div className='message-line'>
                    <span className='message-text'>
                        ◆ Click any card for Detailed Insights ◆
                    </span>
                </div>
            )}
            {cardClicked && (
                <CardsDeepdive
                    key={cardClicked.role_id}
                    selectedCard={cardClicked}
                    setCardClicked={setCardClicked}
                />
            )}
        </div>
    );
});

export default Authorization;