import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import threading
import time

class VMConfigurator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("VM Configurator")
        self.geometry("500x350")
        self.resizable(True, True)

        # Center the window on the screen
        self.center_window()

        # Create a style
        self.style = ttk.Style(self)
        self.configure_styles()

        # Create input fields
        self.create_widgets()

    def center_window(self):
        # Calculate the position to center the window
        window_width = 750
        window_height = 400
        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        position_x = (screen_width // 2) - (window_width // 2)
        position_y = (screen_height // 2) - (window_height // 2)
        self.geometry(f"{window_width}x{window_height}+{position_x}+{position_y}")

    def configure_styles(self):
        # Configure the style with blues and navy colors
        self.style.configure('TLabel', background='#1f1f2e', foreground='#e0e0eb', font=('Helvetica', 12))
        self.style.configure('TButton', background='#1f1f2e', foreground='#e0e0eb', font=('Helvetica', 12), padding=6)
        self.style.configure('TRadiobutton', background='#1f1f2e', foreground='#e0e0eb', font=('Helvetica', 12))
        self.style.configure('TEntry', font=('Helvetica', 12))
        self.style.configure('TScale', background='#1f1f2e')
        self.style.configure('TProgressbar', background='#1f1f2e', foreground='#4f76a3')
        self.configure(background='#1f1f2e')

    def create_widgets(self):
        # OS selection
        self.os_var = tk.StringVar(value="Linux")
        ttk.Label(self, text="Select Operating System:").grid(column=0, row=0, padx=10, pady=10, sticky=tk.W)
        self.linux_radio = ttk.Radiobutton(self, text="Linux (Ubuntu)", variable=self.os_var, value="Linux")
        self.linux_radio.grid(column=1, row=0, padx=10, pady=10, sticky=tk.W)
        self.windows_radio = ttk.Radiobutton(self, text="Windows", variable=self.os_var, value="Windows")
        self.windows_radio.grid(column=2, row=0, padx=10, pady=10, sticky=tk.W)

        # CPUs input
        ttk.Label(self, text="Number of CPUs:").grid(column=0, row=1, padx=10, pady=10, sticky=tk.W)
        self.cpu_var = tk.IntVar()
        self.cpu_entry = ttk.Entry(self, textvariable=self.cpu_var, width=7)
        self.cpu_entry.grid(column=1, row=1, padx=10, pady=10, sticky=tk.W)

        # Memory input
        ttk.Label(self, text="Maximum Memory (MB):").grid(column=0, row=2, padx=10, pady=10, sticky=tk.W)
        self.memory_var = tk.DoubleVar()
        self.memory_slider = ttk.Scale(self, from_=0, to=256000, orient=tk.HORIZONTAL, variable=self.memory_var, command=self.update_memory_label, length=300)
        self.memory_slider.grid(column=1, row=2, padx=10, pady=10, sticky=tk.EW)
        self.memory_entry = ttk.Entry(self, textvariable=self.memory_var, width=8)
        self.memory_entry.grid(column=2, row=2, padx=10, pady=10, sticky=tk.W)
        self.memory_label = ttk.Label(self, text="0.00 mB")
        self.memory_label.grid(column=3, row=2, padx=10, pady=10, sticky=tk.W)

        # Processing power input
        ttk.Label(self, text="Processing Power (MB):").grid(column=0, row=3, padx=10, pady=10, sticky=tk.W)
        self.processing_var = tk.DoubleVar()
        self.processing_slider = ttk.Scale(self, from_=0, to=16000, orient=tk.HORIZONTAL, variable=self.processing_var, command=self.update_processing_label, length=300)
        self.processing_slider.grid(column=1, row=3, padx=10, pady=10, sticky=tk.EW)
        self.processing_entry = ttk.Entry(self, textvariable=self.processing_var, width=8)
        self.processing_entry.grid(column=2, row=3, padx=10, pady=10, sticky=tk.W)
        self.processing_label = ttk.Label(self, text="0.00 mB")
        self.processing_label.grid(column=3, row=3, padx=10, pady=10, sticky=tk.W)

        # Create button
        self.create_button = ttk.Button(self, text="Create", command=self.create_vm)
        self.create_button.grid(column=0, row=4, columnspan=4, pady=20)
        self.create_button.state(["disabled"])

        # Loading animation
        self.progress_bar = ttk.Progressbar(self, mode="indeterminate")
        self.progress_bar.grid(column=0, row=5, columnspan=4, pady=10)
        self.progress_bar.grid_remove()

        # Bind validation to input fields
        self.memory_var.trace_add("write", self.validate_inputs)
        self.cpu_var.trace_add("write", self.validate_inputs)
        self.processing_var.trace_add("write", self.validate_inputs)

        # Bind entry validation
        self.memory_entry.bind("<FocusOut>", self.validate_memory_entry)
        self.processing_entry.bind("<FocusOut>", self.validate_processing_entry)

    def update_memory_label(self, event):
        self.memory_label.config(text=f"{self.memory_var.get():.2f} MB")

    def update_processing_label(self, event):
        self.processing_label.config(text=f"{self.processing_var.get():.2f} MB")

    def validate_memory_entry(self, event):
        try:
            value = float(self.memory_var.get())
            if value < 0 or value > 256000:
                raise ValueError
            self.memory_var.set(round(value, 2))
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid memory value between 0 and 256000 MB.")

    def validate_processing_entry(self, event):
        try:
            value = float(self.processing_var.get())
            if value < 0 or value > 8000:
                raise ValueError
            self.processing_var.set(round(value, 2))
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid processing power value between 0 and 8000 MB.")

    def validate_inputs(self, *args):
        if self.memory_var.get() > 0 and self.cpu_var.get() > 0 and self.processing_var.get() > 0:
            if self.cpu_var.get() > 8:
                messagebox.showwarning("Invalid Input", "The number of CPUs is too high. Please enter a value less than or equal to 8.")
                self.cpu_var.set(8)
                return
            self.create_button.state(["!disabled"])
        else:
            self.create_button.state(["disabled"])

    def create_vm(self):
        self.progress_bar.grid()
        self.progress_bar.start()

        # Simulate a time-consuming task
        threading.Thread(target=self.simulate_vm_creation).start()

    def simulate_vm_creation(self):
        time.sleep(3)  # Simulate a delay
        self.progress_bar.stop()
        self.progress_bar.grid_remove()
        messagebox.showinfo("VM Creation", "VM has been created successfully!")

        # Call createVM function with the values
        self.createVM(self.os_var.get(), self.memory_var.get(), self.cpu_var.get(), self.processing_var.get())

    def createVM(self, os, memory, cpus, processing_power):
        # This function will be implemented later
        print(f"Operating System: {os}, Memory: {memory} MB, CPUs: {cpus}, Processing Power: {processing_power} MB")

if __name__ == "__main__":
    app = VMConfigurator()
    app.mainloop()
