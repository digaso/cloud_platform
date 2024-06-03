import pyone
import tkinter
one = pyone.OneServer("http://34.38.189.124:2633/RPC2", session="oneadmin:12345")
hostpool = one.hostpool.info()
host = hostpool.HOST[0]
id = host.ID
m = tkinter.Tk()
m.title('OpenNebula GUI')
m.geometry('1080x960')
m.configure(background='navy')
m.mainloop()
