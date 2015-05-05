// Adapter from Ghost
var DDL      = require('../lib')
var table    = DDL.table
var types    = DDL.types
var column   = function(columnName, props, fn) {
    return DDL.column(columnName, props, fn).assign({nullable: false})
}
var database = DDL.database

function increments(name = 'id') {
    return column(name, 'increments')
}

var str150   = types.string({maxlength: 150})
var str200   = types.string({maxlength: 200})
var str65535 = types.string({maxlength: 65535})

var medium   = types.text({maxlength: 16777215, fieldtype: 'medium'})
var text2000 = types.text({maxlength: 2000})
var lang     = types.string({maxlength: 6, default: 'en_US'})

var booleanValidation = {validations: {isIn: [[0, 1, false, true]]}}
var uuidValidation    = {validations: {isUUID: true}}

var Posts = table('posts', [
    increments(),
    column('uuid',     types.uuid),
    column('title',    str150),
    column('slug',     str150, {unique: true}),
    column('markdown', medium),
    column('html',     medium),
    column('image',    text2000),
    column('featured', types.bool, {default: false, meta: booleanValidation}),
    column('page',     types.bool, {default: false, meta: booleanValidation}),
    column('status',   str150, {default: 'draft'}),
    column('language', lang),
    column('meta_title', str150),
    column('meta_description', str200),
    column('author_id', types.int),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int),
    column('published_at', types.dateTime),
    column('published_by', types.int)   
]);

var Users = table('users', [
    increments(),
    column('uuid', types.uuid, {validations: {isUUID: true}}),
    column('name', str150),
    column('slug', str150, {unique: true}),
    column('password', types.string({maxlength: 60})),
    column('email', 'string', {maxlength: 254, unique: true, meta: {validations: {isEmail: true}}}),
    column('image', text2000),
    column('cover', text2000),
    column('bio', str200),
    column('website', 'text', {maxlength: 2000, meta: {validations: {isEmptyOrURL: true}}}),
    column('location', str65535),
    column('accessibility', str65535),
    column('status', str150, {default: 'active'}),
    column('language', lang),
    column('meta_title', str150),
    column('meta_description', str200),
    column('last_login', types.dateTime),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var Roles = table('roles', [
    increments(),
    column('uuid', types.uuid, {meta: {validations: {isUUID: true}}}),
    column('name', str150),
    column('description', str200),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var RolesUsers = table('roles_users', [
    increments(),
    column('role_id', types.int),
    column('user_id', types.int)
]);

var Permissions = table('permissions', [
    increments(),
    column('uuid', types.uuid, {meta: {validations: {isUUID: true}}}),
    column('name', str150),
    column('object_type', str150),
    column('action_type', str150),
    column('object_id', types.int),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var PermissionUsers = table('permissions_users', [
    increments(),
    column('user_id', types.int),
    column('permission_id', types.int)
]);

var PermissionsRoles = table('permissions_roles', [
    increments(),
    column('role_id', types.int),
    column('permission_id', types.int)
])
        
var PermissionsApps = table('permissions_apps', [
    increments(),
    column('app_id', types.int),
    column('permission_id', types.int)
]);

var Settings = table('settings', [
    increments(),
    column('uuid', types.uuid, {validations: {isUUID: true}}),
    column('key', str150,    {unique: true}),
    column('value', str65535),
    column('type', str150,   {default: 'core', meta: {validations: {isIn: [['core', 'blog', 'theme', 'app', 'plugin']]}}}),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var Tags = table('tags', [
    increments(),
    column('uuid', types.uuid, {validations: {isUUID: true}}),
    column('name', str150),
    column('slug', str150, {unique: true}),
    column('description', str200),
    column('image', text2000),
    column('hidden', 'bool', {default: false, meta: booleanValidation}),
    column('parent_id', types.int),
    column('meta_title', str150),
    column('meta_description', str200),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var PostsTags = table('posts_tags', [
    increments(),
    column('post_id', types.int, {unsigned: true, references: Posts.id}),
    column('tag_id', types.int, {unsigned: true, references: Tags.id})
]);

var Apps = table('apps', [
    increments(),
    column('uuid', types.uuid, {validations: {isUUID: true}}),
    column('name', str150, {unique: true}),
    column('slug', str150, {unique: true}),
    column('version', str150),
    column('status', str150, {default: 'inactive'}),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var AppSettings = table('app_settings', [
    increments(),
    column('uuid', types.uuid, {validations: {isUUID: true}}),
    column('key', str150, {unique: true}),
    column('value', str65535),
    column('app_id', types.int, {unsigned: true, references: Apps.id}),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var AppFields = table('app_fields', [
    increments(),
    column('uuid', types.uuid, {validations: {isUUID: true}}),
    column('key', str150),
    column('value', str65535),
    column('type', str150, {default: 'html'}),
    column('app_id', types.int, {unsigned: true, references: Apps.id}),
    column('relatable_id', types.int, {unsigned: true}),
    column('relatable_type', str150, {default: 'posts'}),
    column('active', 'bool', {default: true, meta: booleanValidation}),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var Clients = table('clients', [
    increments(),
    column('uuid', 'string', {maxlength: 36}),
    column('name', str150, {unique: true}),
    column('slug', str150, {unique: true}),
    column('secret', str150, {unique: true}),
    column('created_at', types.dateTime),
    column('created_by', types.int),
    column('updated_at', types.dateTime),
    column('updated_by', types.int)
]);

var AccessTokens = table('accesstokens', [
    increments(),
    column('token', types.string, {unique: true}),
    column('user_id', types.int, {unsigned: true, references: Users.id}),
    column('client_id', types.int, {unsigned: true, references: Clients.id}),
    column('expires', 'bigInteger')
]);

var RefreshTokens = table('refreshtokens', [
    increments(),
    column('token', types.string, {unique: true}),
    column('user_id', types.int, {unsigned: true, references: Users.id}),
    column('client_id', types.int, {unsigned: true, references: Clients.id}),
    column('expires', 'bigInteger')
]);

database(
    Posts,
    Users,
    Roles,
    RolesUsers,
    Permissions,
    PermissionUsers,
    PermissionsRoles,
    PermissionsApps,
    Settings,
    Tags,
    PostsTags,
    Apps,
    AppSettings,
    AppFields,
    Clients,
    AccessTokens,
    RefreshTokens
);