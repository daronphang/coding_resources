import uuid
from flask import Flask, request, jsonify
from marshmallow import Schema, fields, ValidationError
from celery import Celery
from celery.result import AsyncResult


class PayloadSchema(Schema):
    fab = fields.Str()
    area = fields.Str()
    tool_name = fields.Str()
    start_date = fields.Str()
    end_date = fields.Str()


app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:5000'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:5555'
celery = Celery(
    app.name,
    broker=app.config['CELERY_BROKER_URL'],
    backend=app.config['CELERY_RESULT_BACKEND'])


@celery.task(bind=True, name="task.tool_health_spc_query", max_retries=3)
def tool_health_spc_query(self, final_payload):
    # SPC query code...
    data = 'results from SPC query'
    print('hello world')

    return {
        'status': 'task completed',
        'data': data
    }


@celery.task(bind=True, name="task.tool_health_fd_query", max_retries=3)
def tool_health_fd_query(self, final_payload):
    # FD query code...
    data = 'results from FD query'
    print('hello world')

    return {
        'status': 'task completed',
        'data': data
    }


class ToolHealthFactory:
    def __init__(self, payload):
        self.payload = payload.copy()   # payload is the request in dictionary

    def queue_task(self):
        pass


class SPCQuery(ToolHealthFactory):
    def __init__(self, payload, spc_db, spc_query):
        self.spc_db = spc_db
        self.spc_query = spc_query
        super().__init(payload)

    def queue_task(self):
        # add additional key value pairs to payload dictionary

        self.payload['spc_db'] = self.spc_db
        self.payload['spc_query'] = self.spc_query

        # add task to queue
        task = tool_health_spc_query.delay(self.payload)
        return {'id': task.id}


class FDQuery(ToolHealthFactory):
    def __init__(self, payload, endpoint, param):
        self.endpoint = endpoint
        self.param = param
        super().__init(payload)

    def queue_task(self):
        # add additional key value pairs to payload dictionary

        self.payload['endpoint'] = self.endpoint
        self.payload['param'] = self.param

        # add task to queue
        task = tool_health_fd_query.delay(self.payload)
        return {'id': task.id}


@app.route('/toolhealth', methods=['POST', 'GET'])
def tool_health():
    payload_json = request.body()
    try:
        payload = PayloadSchema().load(payload_json)

    except ValidationError as e:
        return jsonify({'error': e}), 400

    # create SPC and FD objects
    spc_query = SPCQuery(payload, 'spc db', 'spc query')
    fd_query = FDQuery(payload, 'endpoint', 'param')

    # pushing tasks to queue
    spc_task = spc_query.queue_task()
    fd_task = fd_query.queue_task()

    ids_dict = {
        'tool_health_id': uuid.uuid1(),
        'task_ids': {
            'spc_query_id': spc_task['id'],
            'fd_task_id': fd_task['id']
        }
    }

    return jsonify({
        'message': 'queue tasks successful',
        'ids': ids_dict
        }), 202


@app.route('/tool_health/<tool_health_id>', methods=['POST', 'GET'])
def tool_health_results(tool_health_id):
    payload = request.get_json()    # request body is ids_dict

    if payload['tool_health_id'] == tool_health_id:
        spc_result = AsyncResult(payload['task_ids']['spc_query_id'])
        fd_result = AsyncResult(payload['task_ids']['fd_query_id'])
        return jsonify({
            'spc status': spc_result.status,
            'spc results': spc_result.get(),
            'fd status': fd_result.status,
            'fd results': fd_result.get(),
            })

    return jsonify({
        'message': 'tool_health_id not found. Please try again.'
    })
