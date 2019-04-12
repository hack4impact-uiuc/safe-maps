from flask_script import Manager
from api import create_app

# from apscheduler.schedulers.background import BackgroundScheduler
from api.scrapers.bus_stops import scrape
from api.scrapers.crimes import crime_scrape
from api.scrapers.open_businesses import business_scrape
from api.scrapers.streetlights import streetlight_scrape
from flask import Blueprint, request, jsonify
from api.core import create_response, serialize_list, logger

app = create_app()

manager = Manager(app)

# scheduler = BackgroundScheduler()
# scheduler.add_job(scrape, "interval", weeks=2, timezone="America/Indiana/Indianapolis")
# scheduler.add_job(
#     crime_scrape, "interval", weeks=2, timezone="America/Indiana/Indianapolis"
# )
# scheduler.add_job(
#     business_scrape, "interval", weeks=2, timezone="America/Indiana/Indianapolis"
# )
# scheduler.add_job(
#     streetlight_scrape, "interval", weeks=2, timezone="America/Indiana/Indianapolis"
# )


# @app.route("/schedule", methods=["GET"])
# def get_schedule():
#     """
#     GET function for retrieving all schedules for the scrapers
#     """
#     jobs = [job.name for job in scheduler.get_jobs()]
#     next_time = [
#         job.next_run_time.strftime("%m/%d/%Y, %H:%M:%S") for job in scheduler.get_jobs()
#     ]
#     response = dict(zip(jobs, next_time))
#     return create_response(data=response)


@manager.command
def runserver():
    # scheduler.start()
    app.run(debug=True, host="0.0.0.0", port=5000)


@manager.command
def runworker():
    app.run(debug=False)


if __name__ == "__main__":
    manager.run()
