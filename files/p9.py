# program 9

# Program 9
# Gaussian Naive Bayes on Olivetti Faces Dataset

import numpy as np
import matplotlib.pyplot as plt

from sklearn.datasets import fetch_olivetti_faces
from sklearn.model_selection import (
    train_test_split,
)
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import (
    classification_report,
    accuracy_score
)

# online
# data = fetch_olivetti_faces(shuffle=True, random_state=42) 
# X = data.data 
# y = data.target 

# Load dataset
data = np.load("olivetti_faces_dataset.npz")
X = data["X"]
y = data["y"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train Gaussian Naive Bayes model
gnb = GaussianNB()
gnb.fit(X_train, y_train)

# Predictions
y_pred = gnb.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy*100:.2f}%')

# Classification Report
print('\nClassification Report:')
print(
    classification_report(
        y_test,
        y_pred,
        zero_division=1
    )
)

# Display some test images
fig, axes = plt.subplots(3, 5, figsize=(12, 8))

for ax, image, label, prediction in zip(
        axes.ravel(),
        X_test,
        y_test,
        y_pred):

    ax.imshow(
        image.reshape(64, 64),
        cmap=plt.cm.gray
    )

    ax.set_title(
        f'True: {label}\nPred: {prediction}'
    )

    ax.axis('off')

plt.show()