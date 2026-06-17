# porgram 10 both

# Program 10
# K-Means Clustering on Wisconsin Breast Cancer Dataset

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.datasets import load_breast_cancer
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler


# Online/Built-in Dataset
# data = load_breast_cancer()
# X = data.data


# Offline Dataset
data = pd.read_csv("breast_cancer.csv")
X = data.drop(columns=['target']).values


# Standardize the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


# Apply K-Means Clustering
kmeans = KMeans(
    n_clusters=2,
    random_state=42,
    n_init=10
)

clusters = kmeans.fit_predict(X_scaled)


# Reduce dimensions for visualization
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)


# Convert centroids to 2D
centroids_original = kmeans.cluster_centers_
centroids_pca = pca.transform(centroids_original)


# Plot clusters
plt.figure(figsize=(8, 6))

for cluster, color in zip(range(2), ["red", "blue"]):
    plt.scatter(
        X_pca[clusters == cluster, 0],
        X_pca[clusters == cluster, 1],
        color=color,
        alpha=0.6,
        edgecolor="k",
        label=f"Cluster {cluster}"
    )

plt.scatter(
    centroids_pca[:, 0],
    centroids_pca[:, 1],
    s=250,
    c='black',
    marker='X',
    label='Centroids'
)

plt.legend()

plt.title(
    "K-Means Clustering on Wisconsin Breast Cancer Dataset"
)

plt.xlabel("Principal Component 1")
plt.ylabel("Principal Component 2")

plt.show()