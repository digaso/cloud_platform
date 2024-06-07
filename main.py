import pyone


one = pyone.OneServer("http://34.38.189.124:2633/RPC2", session="oneadmin:12345")
hostpool = one.hostpool.info()
host = hostpool.HOST[0]
print("Host information:")
# Step 1: Create a Disk Image
image_template = '''
NAME="Disk_Test"
PATH="./ubuntu_20_04.qcow2"  
TYPE="OS"
PERSISTENT="YES"
'''

# images = one.imagepool.info(-2, -1, -1)
# for image in images.IMAGE:
#     print(f"ID: {image.ID}, Name: {image.NAME}, Type: {image.TYPE}, Persistent: {image.PERSISTENT}")


# Allocate the image
#datastore_id = 1  # Adjust this as needed
#image_id = one.image.allocate(image_template, datastore_id)
#print(f"Image ID: {image_id}")

templates_info = one.templatepool.info(-2, -1, -1)
for template in templates_info.VMTEMPLATE:
    if template.ID != 0:
        one.template.delete(template.ID)


template_id = one.template.allocate('''
  NAME="test100"
  MEMORY="1024"
  DISK = [
  IMAGE_ID = "1" ]
  CPU="1"
  VCPU="2"
''')

print(f"Created Template ID: {template_id}")

one.template.instantiate(template_id, "TESTE")
print("Instance created successfully")