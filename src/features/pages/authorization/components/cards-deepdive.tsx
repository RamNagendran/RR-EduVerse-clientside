import React, { useCallback, useMemo, useState } from 'react';
import { getRoleDescription, MENUS, PERMISSIONS, ROLE } from '../../../../common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { CardsDeepdiveProps, IBaseResponse } from '../types/auth.type';
import { updateRole } from '../api/authorization.api';
import { MenuPermissionItem, PasswordConfirmModal } from './supportive-compos';
import { AppDispatch } from '../../../../stateManager/reducer/store';
import { fetchRolesThunk } from '../../../../stateManager/reducer/rolesThunk';


const AVAILABLE_PERMISSIONS = ['READ', 'CREATE', 'UPDATE', 'DELETE'] as const;
type PermissionType = typeof AVAILABLE_PERMISSIONS[number];


const CardsDeepdive: React.FC<CardsDeepdiveProps> = React.memo(({
    selectedCard: { role_id, users_count, role_permissions }, setCardClicked
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
    const [permissions, setPermissions] = useState(role_permissions);
    const { user } = useSelector((state: any) => state.auth);
    const [authenticatedPassword, setAuthenticatedPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const roleName = useMemo(() => ROLE[role_id], [role_id]);
    const roleDescription = useMemo(() => getRoleDescription(roleName), [roleName]);

    const togglePermission = useCallback((menu_id: number, permission: PermissionType) => {
        const isPresent = permissions.filter((mnu) => mnu.menu_id === menu_id).length > 0;
        if (!isPresent) {
            const obj = { menu_id, permission_number: PERMISSIONS[permission], permissions: [permission] };
            setPermissions([...permissions, obj]);
            return;
        }
        setPermissions(prevPermissions =>
            prevPermissions.map(item => {
                const isPermissionPresent = item.permissions.includes(permission);
                return (
                    item.menu_id === menu_id
                        ? {
                            ...item,
                            permission_number: isPermissionPresent
                                ? item.permission_number - PERMISSIONS[permission]
                                : item.permission_number + PERMISSIONS[permission],
                            permissions: isPermissionPresent
                                ? item.permissions.filter(p => p !== permission)
                                : [...item.permissions, permission]
                        }
                        : item
                )
            })
        );
    }, [permissions]);

    const handleEditToggle = (menu_id: number) => {
        setPermissions(role_permissions);
        setEditingMenuId(menu_id);
    };

    const handleCancel = () => {
        setEditingMenuId(null);
        setPermissions(role_permissions);
    };

    const handleUpdate = async () => {
        const selectedPermission = permissions.find(item => item.menu_id === editingMenuId);
        const totalPerms_number = Object.keys(PERMISSIONS).reduce((acc: number, crud: string) => {
            acc += selectedPermission?.permissions.includes(crud) ? PERMISSIONS[crud] : 0;
            return acc;
        }, 0)
        const res: IBaseResponse = await updateRole(user.username, user.role_id,
            {
                email: user.email,
                password: authenticatedPassword,
                role_id: role_id,
                menu_id: editingMenuId || 0,
                permissions: totalPerms_number
            }
        );
        setEditingMenuId(null);
        setShowModal(false);
        setAuthenticatedPassword('');
        dispatch(fetchRolesThunk())
        setCardClicked({ role_id, users_count, role_permissions: permissions })
        if (!res.success) {
            setPermissions(role_permissions);
            return;
        }
    };

    return (
        <div className='cards-deepdive'>
            <div className='dd-title'>ROLE GOVERNANCE ❯ {roleName}</div>
            <div className='dd-description'>{roleDescription}</div>
            <div className='permissions-section'>
                {Object.entries(MENUS).map(([menu_id, menu_name]) => {
                    const currPermissions =
                        permissions.find(item => item.menu_id === Number(menu_id))?.permissions || [];
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
                            onSave={() => setShowModal(true)}
                        />
                    );
                })}
            </div>
            <PasswordConfirmModal
                roleName={roleName}
                show={showModal}
                setShow={setShowModal}
                setAuthenticatedPassword={setAuthenticatedPassword}
                onConfirm={handleUpdate}
            />
        </div>
    );
});

export default CardsDeepdive;