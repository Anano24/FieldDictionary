from src.extensions import db


class BaseModel(db.Model):

    __abstract__ = True

    def create(self, commit=True, flush=False):
        db.session.add(self)

        if commit:
            self.save()

        if flush:
            db.session.flush()


    def save(self):
        db.session.commit()


    def delete(self):
        db.session.delete(self)
        db.session.commit()