import pyone


one = pyone.OneServer("http://34.22.235.0:2633/RPC2", session="oneadmin:12345")
hostpool = one.hostpool.info()
host = hostpool.HOST[0]
print()
# Step 1: Create a Disk Image
image_template = '''
NAME="my_disk_image"
PATH="/var/lib/one/datastores/0/disk.img"  # Adjust this path as necessary
TYPE="OS"
PERSISTENT="YES"
'''

# Allocate the image
datastore_id = 0  # Adjust this as needed
image_id = one.image.allocate(image_template, datastore_id)
print(f"Image ID: {image_id}")

one.template.allocate('''
  NAME="test100"
  MEMORY="1024"
  DISK=[ ${image_id} ]
  CPU="1"
  VCPU="2"
''')

