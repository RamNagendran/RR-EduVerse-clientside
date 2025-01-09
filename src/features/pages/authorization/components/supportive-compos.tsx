import React from "react";
import { Button } from "react-bootstrap";
import { MENU_DESCRIPTIONS } from "../../../../common/constants";
import EditIcon from '../../../../assets/images/SVGs/icn_Edit.svg';

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
    <div style={{ border: isEditing ? "1px solid #888" : "1px solid #888", cursor: isEditing ? 'pointer' : 'default', transition: 'all 0.3s ease-in-out' }}
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
        <div
            key={menuId}
            style={isEditing ?
                {
                    padding: "15px 10px",
                    boxShadow: "rgba(14, 30, 37, 0.12) 0px 0px 5px 0px, rgba(14, 30, 37, 0.32) 0px 0px 10px 0px",
                    transition: 'all 0.3s ease',
                    borderRadius: "5px",
                    backgroundColor: "#f0f8ff",
                    transform: "translateY(-1px)"
                } :
                {
                    transition: 'all 0.3s ease'
                }
            }
            className='menu-permission-item'
        >
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
                        style={{ height: "55px" }}
                        className='d-flex flex-column align-items-end justify-content-between'
                    >
                        <Button
                            className='toggle-btn cancel-toggle-btn'
                            onClick={onCancel}
                        >Cancel</Button>
                        <Button
                            className='toggle-btn save-toggle-btn'
                            onClick={onSave}
                        >Save</Button>
                    </div>
                )}
            </>
        </div>
    );
});

export { MenuPermissionItem, PermissionChip };