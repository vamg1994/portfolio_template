from flask import Flask, render_template

app = Flask(__name__, static_folder='../static', template_folder='../templates')

@app.route('/')
def portfolio():
    # Define project information
    projects = [
        {
            'name': 'Project 1',
            'image': 'p1.gif',
            'url': '/project1'
        },
        {
            'name': 'Project 2',
            'image': 'p2.gif',
            'url': '/project2'
        }
    ]
    
    # Define contact information
    contacts = [
        {
            'name': 'LinkedIn',
            'url': 'https://www.linkedin.com/in/vamadrid'
        },
        {
            'name': 'WhatsApp',
            'url': 'https://api.whatsapp.com/send?phone=50431755652&text='
        },
        {
            'name': 'Email',
            'url': 'mailto:virgiliomadrid1994@gmail.com'
        }
    ]
    
    return render_template('index.html', projects=projects, contacts=contacts)

@app.route('/project1')
def project1():
    return "This is Project 1"

@app.route('/project2')
def project2():
    return "This is Project 2"

if __name__ == '__main__':
    app.run(debug=True)