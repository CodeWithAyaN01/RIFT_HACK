# ML 5 offline
import numpy as np
import matplotlib.pyplot as plt
from collections import Counter

# Generate 100 random values between 0 and 1
data = np.random.rand(100)

# Label first 50 points
labels = ["Class1" if x <= 0.5 else "Class2" for x in data[:50]]

# Euclidean Distance Function
def euclidean_distance(x1, x2):
    return abs(x1 - x2)

# k-NN Classifier
def knn_classifier(train_data, train_labels, test_point, k):

    distances = [
        (euclidean_distance(test_point, train_data[i]), train_labels[i])
        for i in range(len(train_data))
    ]

    distances.sort(key=lambda x: x[0])

    knn = distances[:k]

    knn_labels = [label for _, label in knn]

    return Counter(knn_labels).most_common(1)[0][0]

# Split dataset
train_data = data[:50]
test_data = data[50:]
train_labels = labels

# Different values of k
k_values = [1, 2, 3, 4, 5, 20, 30]

print("----- k-NN Classification -----\n")

results = {}

for k in k_values:

    print(f"Results for k = {k}")

    classified_labels = [
        knn_classifier(train_data, train_labels, test_point, k)
        for test_point in test_data
    ]

    results[k] = classified_labels

    for i, label in enumerate(classified_labels, start=51):
        print(
            f"Point x{i} (value = {test_data[i-51]:.4f}) "
            f"is classified as {label}"
        )

    print("\n")

print("Classification Complete.\n")

# Visualization
for k in k_values:

    classified_labels = results[k]

    class1_points = [
        test_data[i]
        for i in range(len(test_data))
        if classified_labels[i] == "Class1"
    ]

    class2_points = [
        test_data[i]
        for i in range(len(test_data))
        if classified_labels[i] == "Class2"
    ]

    plt.figure(figsize=(10, 6))

    plt.scatter(
        train_data,
        [0] * len(train_data),
        marker='o',
        c=["blue" if label == "Class1" else "red"
           for label in train_labels],
        label="Training Data"
    )

    plt.scatter(
        class1_points,
        [1] * len(class1_points),
        c='blue',
        marker='x',
        label="Class1 (Test)"
    )

    plt.scatter(
        class2_points,
        [1] * len(class2_points),
        c='red',
        marker='x',
        label="Class2 (Test)"
    )

    plt.title(f"k-NN Classification for k = {k}")
    plt.xlabel("Data Points")
    plt.ylabel("Classification Level")
    plt.legend()
    plt.grid()

    plt.show()