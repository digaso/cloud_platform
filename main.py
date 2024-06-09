import pyone

# Connect to the OpenNebula server
one = pyone.OneServer("http://104.199.41.215:2633/RPC2", session="oneadmin:12345")

# Get SSH key from file (you can replace this with actual reading from a file if needed)
ssh_public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDuz+sNIACCywc42g/2c89YGczNBKJnpqIieC3RTfrJ+YSUlrUc+rrmbU/oZGCa2NiayzYY1qY9L1iGfg4UWj3tBqwN/qhl6cAwRK24Pj4q9wO+YDyCjWR0WLZN7skUPIHQghx8UIuibrd1b+7739ZSqdv3RYw6xg9F1e++qwuo60HpnBs2/aj78lwHrkwt2qr3O9BkrLBgOMxjKUBPr9byEkGRvxxi0fQbdNnL5+4G8tSQ+TLCtX7yow+HyghcTGlxo+aj0X9lvSaCErBPLWp37dJcXpNjaW/iS+SHdi1e9pnrm101LQ3hDC/kuvJvYyOtCkvLHHoVrboCuAKDZRvMrBKZnacdHNSkzDRF0NgdVmMl5kpOE580gTj5avdQyTS++Sbyh0YmLgLkh2aGn67ZVkZZU2gmCDz+xjYQsMs8wSnmcWu+pBsTJJ7LDXaZRR39wFKqP1A9gCEi6M51J6W0WFs11hwrY1y8GxE25Blelt1XwMYnYxhJF2ozV/q21I8= digaso@digaso-pc"

# Step 1: Create a Disk Image
image_template = '''
NAME = "Disk_Test2w22"
PATH = "./ubuntu_20_04.qcow2"
TYPE = "OS"
'''

# Allocate the new disk image
image_id = one.image.allocate(image_template,1)

# Clean up existing templates (Be careful with this, it will delete all non-zero templates)
templates_info = one.templatepool.info(-2, -1, -1)
for template in templates_info.VMTEMPLATE:
    if template.ID != 0:
        one.template.delete(template.ID)

# Allocate the new template
template_id = one.template.allocate(f'''
NAME="{name}"
CONTEXT = [
    NETWORK = "YES"]
CPU = "1"
MEMORY = "1024"
DISK = [
    SIZE = "{size}",
    IMAGE_ID = "{image_id}" ]
NIC = [
    NETWORK_ID = "0",
    MODEL = "virtio"]
GRAPHICS = [
    LISTEN = "0.0.0.0",
    TYPE = "VNC"]''')

print(f"Created Template ID: {template_id}")

# Instantiate the template
instance_id = one.template.instantiate(template_id, "teste")

print("Instance created successfully")
