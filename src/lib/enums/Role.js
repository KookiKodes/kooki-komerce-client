import Enum from './Enum';

const rolesNames = ['guest', 'subscriber', 'admin'];

const Role = Enum(rolesNames);

export default Role;
