import json
import requests
import time
import urllib2
from threading import Thread

URL_MWDB = "http://127.0.0.1:11000/collect"
SENSORS = ["DOOR_443", "TEMP_443V", "TEMP_CAMPUS"]
PERIOD = 1

def urlBase(sensor):
	return "http://smartcampus.unice.fr/sensors/" + sensor + "/data/last"

def post(name, value, date):
	r = requests.post(URL_MWDB, json={'n': name, 'v': str(value), 't': str(date)})
	print(r.status_code, r.reason)

def receiveAndPost(sensor):
	result = json.loads(urllib2.urlopen(urlBase(sensor)).read())
	value = result["values"][0]["value"]
	date = result["values"][0]["date"]
	post(sensor, value, date)

def collect(sensor):
	while True:
		receiveAndPost(sensor)
		time.sleep(PERIOD)

class Retrieve(Thread):
	def __init__(self, sensor):
		Thread.__init__(self)
		self.sensor = sensor

	def run(self):
		collect(self.sensor)

	


for sensor in SENSORS:
	t = Retrieve(sensor)
	t.deamon = True
	t.start()

while True:
    time.sleep(1)
