import React, { useCallback, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getRoleDescription, MENU_DESCRIPTIONS, MENUS, ROLE } from '../../../../common/constants';
import EditIcon from '../../../../assets/images/SVGs/icn_Edit.svg';
import { IBaseResponse, IPermissions } from '../types/auth.type';
import { updateRole } from '../api/authorization.api';
import { useSelector } from 'react-redux';

interface CardsDeepdiveProps {
    selectedCard: {
        role_id: number;
        role_permissions: IPermissions[];
    };
}

const AVAILABLE_PERMISSIONS = ['READ', 'CREATE', 'UPDATE', 'DELETE'] as const;
type PermissionType = typeof AVAILABLE_PERMISSIONS[number];

const PermissionChip: React.FC<{
    permission: PermissionType;
    isActive: boolean;
    isEditing: boolean;
    onToggle: () => void;
}> = React.memo(({ 
    permission, 
    isActive, 
    isEditing, 
    onToggle 
}) => (
    <div
        className={`permission-chip ${isActive ? 'active' : ''}`}
        onClick={isEditing ? onToggle : undefined}
    >
        {permission}
    </div>
));

const MenuPermissionItem: React.FC<{
    menuId: number;
    menuName: string;
    currentPermissions: string[];
    isEditing: boolean;
    onEditToggle: (menuId: number) => void;
    onPermissionToggle: (menuId: number, permission: PermissionType) => void;
    onCancel: () => void;
    onSave: () => void;
}> = React.memo(({
    menuId,
    menuName,
    currentPermissions,
    isEditing,
    onEditToggle,
    onPermissionToggle,
    onCancel,
    onSave
}) => {
    return (
        <div key={menuId} className='menu-permission-item'>
            <div className='menu-details'>
                <div className='menu-name'>{menuName}</div>
                <div className='menu-description'>{MENU_DESCRIPTIONS[menuId]}</div>
            </div>
            <div className='permission-toggle'>
                {AVAILABLE_PERMISSIONS.map(permission => (
                    <PermissionChip
                        key={permission}
                        permission={permission}
                        isActive={currentPermissions.includes(permission)}
                        isEditing={isEditing}
                        onToggle={() => onPermissionToggle(menuId, permission)}
                    />
                ))}
            </div>
            <>
                {!isEditing && (
                    <Button 
                        className='toggle-btn edit-toggle-btn' 
                        onClick={() => onEditToggle(menuId)}
                    >
                        <img 
                            style={{ marginRight: "5px" }} 
                            height={12} 
                            width={12} 
                            src={EditIcon} 
                            className='edit-icon' 
                            alt="Edit permissions"
                        />
                        <span>Edit</span>
                    </Button>
                )}
                {isEditing && (
                    <div 
                        style={{ width: "11%", height: "100%" }} 
                        className='d-flex align-items-center justify-content-between'
                    >
                        <Button 
                            className='toggle-btn cancel-toggle-btn' 
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className='toggle-btn save-toggle-btn' 
                            onClick={onSave}
                        >
                            Save
                        </Button>
                    </div>
                )}
            </>
        </div>
    );
});

const CardsDeepdive: React.FC<CardsDeepdiveProps> = React.memo(({ 
    selectedCard: { role_id, role_permissions } 
}) => {
    const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
    const [permissions, setPermissions] = useState(role_permissions);
    const {user} = useSelector((state: any) => state.auth);

    const roleName = useMemo(() => ROLE[role_id], [role_id]);
    const roleDescription = useMemo(() => getRoleDescription(roleName), [roleName]);

    const togglePermission = useCallback((menu_id: number, permission: PermissionType) => {
        setPermissions(prevPermissions =>
            prevPermissions.map(item =>
                item.menu_id === menu_id
                    ? {
                        ...item,
                        permissions: item.permissions.includes(permission)
                            ? item.permissions.filter(p => p !== permission)
                            : [...item.permissions, permission]
                    }
                    : item
            )
        );
    }, []);

    const handleEditToggle = (menu_id: number) => {
        setEditingMenuId(menu_id);
    };

    const handleCancel = () => {
        setEditingMenuId(null);
        setPermissions(role_permissions);
    };

    const handleSave = async () => {
        // const res: IBaseResponse = await updateRole(user.username, user.role_id,
        //     {
        //         email: user.email,
        //         authenticated_password: '',
        //         role_id: user.role_id,
        //         menu_id: editingMenuId || 0,
        //         permissions: editingMenuId ? permissions.find(item => item.menu_id === editingMenuId)?.permission_number || 0 : 0
        //     }
        // );
        // setEditingMenuId(null);
        // if (!res.success) {
        //     setPermissions(role_permissions);
        //     return;
        // }
        // TODO: Implement actual save logic
        console.log('Permissions saved:', permissions);
    };

    return (
        <div className='cards-deepdive'>
            <div className='dd-title'>ROLE GOVERNANCE ❯ {roleName}</div>
            <div className='dd-description'>{roleDescription}</div>

            <div className='permissions-section'>
                <div className='permissions-header'>
                    <h6 style={{opacity: 0.7}}>Menu-Level Permission Management</h6>
                </div>

                {Object.entries(MENUS).map(([menu_id, menu_name]) => {
                    const currPermissions = 
                    permissions.find(item => item.menu_id == Number(menu_id))?.permissions || [];
                    const isEditing = editingMenuId === Number(menu_id);

                    return (
                        <MenuPermissionItem
                            key={menu_id}
                            menuId={Number(menu_id)}
                            menuName={menu_name}
                            currentPermissions={currPermissions}
                            isEditing={isEditing}
                            onEditToggle={handleEditToggle}
                            onPermissionToggle={togglePermission}
                            onCancel={handleCancel}
                            onSave={handleSave}
                        />
                    );
                })}
            </div>
        </div>
    );
});

export default CardsDeepdive;