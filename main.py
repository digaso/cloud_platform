import pyone

def template_exists(one, name):
    template_pool = one.templatepool.info(-1, -1, -1)
    for template in template_pool.VMTEMPLATE:
        if template.NAME == name:
            return template.ID
    return None

def create_template(name="teste", memory=1024, cpu=1):
    template = f'''
    NAME="{name}"
    MEMORY="{memory}"
    CPU="{cpu}"
    VCPU="{cpu}"
    '''
    return template

# Connect to the OpenNebula server
one = pyone.OneServer("http://34.22.235.0:2633/RPC2", session="oneadmin:12345")
print("Connected to OpenNebula (version {one.version}")

# Check if the template already exists
template_name = "teste"
existing_template_id = template_exists(one, template_name)
if existing_template_id:
    print(f"Template '{template_name}' already exists with ID: {existing_template_id}")
    template_id = existing_template_id
else:
    # Create the VM template with provided values
    template_str = create_template(name=template_name)
    template_id = one.template.allocate(template_str)
    print(f"Template created with ID: {template_id}")

# Instantiate a VM from the template
vm_instance_name = "User_VM_Instance"
vm_id = one.template.instantiate(template_id, vm_instance_name)
print(f"VM instantiated with ID: {vm_id}")

# Change ownership of the VM (if necessary)
user_id = 2  # Replace with actual user ID
one.vm.chown(vm_id, user_id, -1)
print(f"VM with ID {vm_id} assigned to user with ID {user_id}")

# Adjust user permissions (if necessary)
one.vm.chmod(vm_id, owner_u=1, owner_m=1, owner_a=1)
print(f"Permissions set for VM with ID {vm_id}")

# Verify the VM is created and running
vmpool = one.vmpool.info(-1, -1, -1, -1)
vms = vmpool.VM
print(f"Total number of VMs: {len(vms)}")
for vm in vms:
    print(f"VM ID: {vm.ID}, Name: {vm.NAME}, State: {vm.STATE}")
