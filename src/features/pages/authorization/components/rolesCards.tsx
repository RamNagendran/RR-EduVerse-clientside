import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IRoles, RoleCardProps } from '../types/auth.type';
import { ROLE } from '../../../../common/constants';

import Admin from '../../../../assets/images/image/admin.png';
import Trainer from '../../../../assets/images/image/trainner.png';
import Counselor from '../../../../assets/images/image/councellor.png';
import Placement from '../../../../assets/images/image/placements.png';


const RoleCardItem: React.FC<RoleCardProps> = React.memo(({
    role,
    index,
    isSelected,
    onSelect
}) => {
    const getIcon = useMemo(() => {
        const isAdmin = role.role_id === 101;
        const isTrainer = role.role_id === 102;
        const isCounselor = role.role_id === 103;

        if (isAdmin) return Admin;
        if (isTrainer) return Trainer;
        if (isCounselor) return Counselor;
        return Placement;
    }, [role.role_id]);

    const cardStyles = useMemo(() => {
        const delay = index * 0.1 + "s";
        const isAdmin = role.role_id === 101;
        const isTrainer = role.role_id === 102;
        const isCounselor = role.role_id === 103;

        const boxShadow = isSelected
            ? "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
            : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px";

        const backgroundColor = isSelected ? "#F2F9FF" : "#fff";
        const color = isAdmin
            ? "#039400c4"
            : isTrainer
                ? "#606afff2"
                : isCounselor
                    ? "#d48900fc"
                    : "#A033FF";

        return {
            delay,
            boxShadow,
            backgroundColor,
            color
        };
    }, [role, isSelected, index]);

    return ROLE.hasOwnProperty(role.role_id) ? (
        <div
            key={index}
            className='slideIn rCard'
            onClick={() => onSelect(isSelected ? null : role)}
            style={{
                animation: `slideIn .5s forwards ${cardStyles.delay}`,
                boxShadow: cardStyles.boxShadow,
                backgroundColor: cardStyles.backgroundColor,
                transition: "all 0.3s ease-in-out"
            }}
        >
            <div className='r-icon'>
                <img
                    style={{ opacity: 0.7 }}
                    width={35}
                    src={getIcon}
                    alt={`${ROLE[role.role_id]} icon`}
                />
            </div>
            <div className='d-flex flex-column align-items-start p-2'>
                <div
                    style={{ color: cardStyles.color }}
                    className='r-name'
                >
                    {ROLE[role.role_id]}
                </div>
                <div className='r-users'>
                    Users: <span style={{ color: "#000" }}>{role.users_count}</span>
                </div>
            </div>
        </div>
    ) : null;
}, (prevProps, nextProps) =>
    prevProps.role.role_id === nextProps.role.role_id &&
    prevProps.isSelected === nextProps.isSelected
);

const RolesCard: React.FC<{
    cardClicked: IRoles | null;
    setCardClicked: React.Dispatch<React.SetStateAction<IRoles | null>>
}> = React.memo(({
    cardClicked,
    setCardClicked
}) => {
    const { roles } = useSelector((state: any) => state.roles);

    const handleCardSelect = (role: IRoles | null) => {
        setCardClicked(role);
    };

    return (
        <div className='roles-card'>
            {roles.map((role: IRoles, index: number) => (
                <RoleCardItem
                    key={role.role_id}
                    role={role}
                    index={index}
                    isSelected={cardClicked?.role_id === role.role_id}
                    onSelect={handleCardSelect}
                />
            ))}
        </div>
    );
});

export default RolesCard;