import pyone


one = pyone.OneServer("http://34.22.235.0:2633/RPC2", session="oneadmin:12345")
hostpool = one.hostpool.info()
host = hostpool.HOST[0]
print()
